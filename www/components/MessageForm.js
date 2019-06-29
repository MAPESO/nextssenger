import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../styles/message-form.css';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputMessage: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ inputMessage: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { roomID, handleSend } = this.props;
    const { inputMessage } = this.state;
    roomID.map(room => {
      handleSend(inputMessage, room);
    });
    this.setState({ inputMessage: '' });
  }
  render() {
    return (
      <footer className="chat-footer" onSubmit={this.handleSubmit}>
        <form className="message-form">
          <input
            className="message-input"
            required
            autoComplete="off"
            type="text"
            onChange={this.handleChange}
            value={this.state.inputMessage}
            placeholder="Type here..."
          />
        </form>
      </footer>
    );
  }
}

MessageForm.propTypes = {
  handleSend: PropTypes.func.isRequired,
  roomID: PropTypes.array
};

export { MessageForm };
