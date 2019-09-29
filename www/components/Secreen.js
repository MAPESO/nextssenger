import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import '../styles/chat-screen.css';

function Screen(props) {
  const { children } = props;
  return (
    <section className="chat-screen">
      <header className="chat-header">
        <div style={{ textAlign: 'center' }}>
          <Link href="/logout">
            <a>LOG OUT</a>
          </Link>
        </div>
      </header>
      {children}
    </section>
  );
}

Screen.propTypes = {
  children: PropTypes.any
};

export { Screen };
