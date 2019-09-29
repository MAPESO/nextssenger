/* eslint no-console:0 */
// Packages
import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import PropTypes from 'prop-types';
import tinytime from 'tinytime';

// Components
import { Layout } from './Layout';
import { Sidebar } from './Sidebar';
import { MessageForm } from './MessageForm';
import { Messages } from './Message/Messages';
import { Screen } from './Secreen';

class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.sendDM = this.sendDM.bind(this);
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
        this.currentUser.subscribeToRoomMultipart({
          roomId: '19439298',
          hooks: {
            onMessage: message => {
              const { name } = message.sender;
              const { id, parts, senderId } = message;
              const template = tinytime('{h}:{mm}:{a}');
              const {
                payload: { content }
              } = parts[0];
              const messageDetails = {
                name,
                id,
                senderId,
                text: content,
                date: template.render(new Date())
              };
              this.setState(state => ({
                messages: state.messages.concat(messageDetails)
              }));
            }
          },
          messageLimit: 0
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
        console.log('mensaje se envio con exito !');
      })
      .catch(err => {
        console.log('problema al enviar el mensaje');
        throw new Error(err);
      });
  }

  render() {
    const { messages } = this.state;
    console.log(messages);
    return (
      <Layout>
        <Sidebar />
        <Screen>
          <Messages messages={messages} id={this.props.id} />
          <MessageForm sendDM={this.sendDM} />
        </Screen>
      </Layout>
    );
  }
}

ChatApp.propTypes = {
  id: PropTypes.string.isRequired
};

export { ChatApp };
