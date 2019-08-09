/* eslint no-console:0 */
// Packages
import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import PropTypes from 'prop-types';
import UUID from 'uuid-generate';

// Components
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { UserList } from './UserList';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { Screen } from './Secreen';

class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomUsers: [],
      messageLocal: [],
      isSend: false,
      currentUser: null
    };

    this.sendDM = this.sendDM.bind(this);
    this.removeLastItem = this.removeLastItem.bind(this);
    this.currentUser = null;
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: process.env.CHATKIT_LOCATOR,
      userId: this.props.id,
      tokenProvider: new TokenProvider({ url: process.env.CHATKIT_TOKEN })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.setState({ currentUser });
        currentUser
          .subscribeToRoomMultipart({
            roomId: '19439298',
            hooks: {
              onMessage: message => {
                // brodcast a los clientes
                console.log('New message');
                console.log(message);
              }
            }
          })
          .then(room => {
            this.setState(state => ({
              roomUsers: [...state.roomUsers, ...room.users]
            }));
          });
      })
      .catch(err => {
        throw new Error(`Error connect with chatkit: ${err}`);
      });
  }

  sendDM(text) {
    this.currentUser
      .sendSimpleMessage({
        text,
        roomId: '19439298'
      })
      .then(() => {
        const messageSucces = { data: text, confirmedAt: UUID.generate() };
        this.setState(state => ({
          messageLocal: [...state.messageLocal, messageSucces]
        }));
      })
      .catch(() => {
        const failedMessage = { data: text, confirmedAt: null };
        this.setState(state => ({
          messageLocal: [...state.messageLocal, failedMessage]
        }));
      });
  }

  removeLastItem() {
    const { messageLocal } = this.state;
    const removedItem = [...messageLocal];
    removedItem.pop();
    this.setState({ messageLocal: removedItem });
  }

  render() {
    const { roomUsers, currentUser, messageLocal } = this.state;
    console.log(messageLocal);
    return (
      <Layout>
        <Sidebar>
          <UserList roomUsers={roomUsers} currentUser={currentUser} />
        </Sidebar>
        <Screen>
          <MessageList
            username={this.props.username}
            messageLocal={messageLocal}
          />
          <MessageForm
            sendDM={this.sendDM}
            removeLastItem={this.removeLastItem}
          />
        </Screen>
      </Layout>
    );
  }
}

ChatApp.propTypes = {
  username: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export { ChatApp };
