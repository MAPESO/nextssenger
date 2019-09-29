// Packages
import React from 'react';
import PropTypes from 'prop-types';

// Componentes
import { Layout } from '../components/Layout';
import { ChatApp } from '../components/Chat';

function Index(props) {
  const { id } = props.dataGoogle;
  return (
    <Layout>
      <ChatApp id={id} />
    </Layout>
  );
}

Index.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const Cookies = require('cookies');
    const jwt = require('jsonwebtoken');
    const cookies = new Cookies(req, res, {
      keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2]
    });
    const token = cookies.get('from-user-google', { signed: true });
    const isToken = Object.is(token, undefined);
    if (isToken) {
      res.writeHead(303, { Location: '/login' });
      res.end();
      return {};
    }
    const dataGoogle = jwt.verify(token, process.env.JWT_KEY);
    return { dataGoogle };
  }
};

Index.propTypes = {
  dataGoogle: PropTypes.object.isRequired
};

export default Index;
