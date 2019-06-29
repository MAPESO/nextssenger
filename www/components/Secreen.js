import React from 'react';
import PropTypes from 'prop-types';

import '../styles/chat-screen.css';

function Screen(props) {
  const { children } = props;
  return (
    <section className="chat-screen">
      <header className="chat-header"></header>
      {children}
    </section>
  );
}

Screen.propTypes = {
  children: PropTypes.any
};

export { Screen };
