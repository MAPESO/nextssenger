/* eslint no-console:0 */
// Packages
import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import PropTypes from 'prop-types';

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
      currentUser: null,
      roomUsers: [],
      roomID: [],
      messages: []
    };

    this.currentUser = null;
    this.createRoom = this.createRoom.bind(this);
    this.connectRoom = this.connectRoom.bind(this);
    this.sendDM = this.sendDM.bind(this);
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
            roomId: '19439298'
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

  createRoom(user, index) {
    const { roomID } = this.state;
    if (!roomID[index]) {
      this.currentUser
        .createRoom({
          name: user.name,
          private: true,
          addUserIds: [this.props.id, user.id]
        })
        .then(room => {
          console.log(`Create room ${room.name} - ${room.id}`);
          this.setState(state => ({
            roomID: [...state.roomID, room.id]
          }));
          this.connectRoom();
        })
        .catch(err => {
          throw new Error(`Problem create room: ${err}`);
        });
    }
  }

  connectRoom() {
    this.state.roomID.map(id => {
      this.currentUser.subscribeToRoomMultipart({
        roomId: `${id}`,
        hooks: {
          onMessage: message => {
            console.log('New message');
            console.log(message);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendDM(text, id) {
    console.log('envio de mensaje listo');
    this.currentUser.sendSimpleMessage({
      text,
      roomId: `${id}`
    });
  }

  render() {
    const { roomUsers, currentUser, messages, roomID } = this.state;
    return (
      <Layout>
        <Sidebar>
          <UserList
            roomUsers={roomUsers}
            currentUser={currentUser}
            handleRoom={this.createRoom}
          />
        </Sidebar>
        <Screen>
          <MessageList messages={messages} />
          <MessageForm handleSend={this.sendDM} roomID={roomID} />
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
