import React from 'react';
import PropTypes from 'prop-types';

import '../styles/message-list.css';

function MessageList(props) {
  const { messages } = props;
  return (
    <ul className="chat-messages">
      {messages.map(message => {
        const { payload } = message.parts[0];
        const { content } = payload;
        return (
          <li className="message" key={message.id}>
            {content} - {message.senderId}
          </li>
        );
      })}
    </ul>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export { MessageList };
