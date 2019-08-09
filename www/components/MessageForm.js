import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../styles/message-form.css';

function MessageForm(props) {
  const { sendDM, removeLastItem } = props;
  const handlePress = event => {
    const { key } = event;
    sendDM(key);
  };
  const handlePressDown = event => {
    const { keyCode } = event;
    if (keyCode === 8) {
      removeLastItem();
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
  sendDM: PropTypes.func.isRequired,
  removeLastItem: PropTypes.func.isRequired
};

export { MessageForm };
