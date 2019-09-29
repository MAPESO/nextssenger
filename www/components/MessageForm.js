import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../styles/message-form.css';

function MessageForm(props) {
  const { sendDM } = props;
  const handlePress = event => {
    const { key } = event;
    if (key !== 'Enter') {
      sendDM(key);
    }
  };
  const handlePressDown = event => {
    const { key } = event;
    if (key === 'Backspace') {
      // eslint-disable-next-line no-undef
      alert('Back Space');
    } else if (key === 'Enter') {
      // eslint-disable-next-line no-undef
      alert('Enter');
    }
  };
  return (
    <footer className="chat-footer">
      <div className="message-form">
        <input
          className="message-input"
          required
          autoComplete="off"
          type="text"
          onKeyPress={handlePress}
          onKeyDown={handlePressDown}
          placeholder="Type heree...."
        />
      </div>
    </footer>
  );
}

MessageForm.propTypes = {
  sendDM: PropTypes.func.isRequired
};

export { MessageForm };
