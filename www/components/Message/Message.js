import React from 'react';
import PropTypes from 'prop-types';

function Message(props) {
  const { name, text, date, senderID, id } = props;
  if (senderID !== id) {
    return (
      <div>
        <span
          style={{
            color: '#999999',
            fontSize: '.8em',
            textTransform: 'lowercase'
          }}
        >
          {date}{' '}
        </span>
        <span>
          {name}: {text}
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span
          style={{
            color: '#999999',
            fontSize: '.8em',
            textTransform: 'lowercase'
          }}
        >
          {date}{' '}
        </span>
        <span style={{ color: '#3291FF' }}>
          {name}: {text}
        </span>
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  senderID: PropTypes.string.isRequired
};

export { Message };
