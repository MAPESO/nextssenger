import React from 'react';
import PropTypes from 'prop-types';

import { MessageList } from './MessageList';

function Messages(props) {
  const { messages, id } = props;
  return (
    <div className="chat-messages">
      <MessageList messages={messages} id={id} />
      <style jsx>{`
        .chat-messages {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-bottom: 0;
          min-height: min-content;
        }

        .message {
          padding-left: 20px;
          padding-right: 20px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .message {
          display: inline;
        }

        .message .user-id {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export { Messages };
