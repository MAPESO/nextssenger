import React from 'react';
import PropTypes from 'prop-types';

import { Message } from './Message';

function MessageList(props) {
  const { messages, id } = props;
  const onlyMessage = messages.reduce((objectMessage, message) => {
    const { senderId, text } = message;
    if (!objectMessage[senderId]) {
      objectMessage[senderId] = { ...message };
    } else {
      objectMessage[senderId].text += text;
    }
    return objectMessage;
  }, {});
  const messageList = Object.values(onlyMessage);
  return messageList.map(message => (
    <Message
      key={message.id}
      name={message.name}
      text={message.text}
      date={message.date}
      senderID={message.senderId}
      id={id}
    />
  ));
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export { MessageList };
