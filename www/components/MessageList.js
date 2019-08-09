import React from 'react';
import PropTypes from 'prop-types';

function MessageList(props) {
  const { username, messageLocal } = props;
  return (
    <ul className="chat-messages">
      <p>
        {username}:{' '}
        {messageLocal.map((message, index) => {
          if (message.confirmedAt !== null) {
            return <span key={index}>{message.data}</span>;
          } else {
            return <span style={{ color: '#999999' }}>{message.data}</span>;
          }
        })}
      </p>
      <a href="/logout">logout</a>
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
    </ul>
  );
}

MessageList.propTypes = {
  username: PropTypes.string.isRequired,
  messageLocal: PropTypes.array.isRequired
};

export { MessageList };
