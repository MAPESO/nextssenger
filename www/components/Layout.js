import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import '../styles/layout.css';

function Layout(props) {
  const { children } = props;
  return (
    <div className="App">
      <style global jsx>{`
        html {
          box-sizing: border-box;
        }
        *,
        *::before,
        *::after {
          box-sizing: inherit;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
      <Head>
        <title>chat</title>
      </Head>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any
};

export { Layout };
