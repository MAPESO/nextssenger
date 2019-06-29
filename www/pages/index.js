// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

// Componentes
import { Layout } from '../components/Layout';
import { ChatApp } from '../components/Chat';

class Index extends Component {
  static async getInitialProps({ req, res }) {
    const isServer = typeof window === 'undefined';
    if (isServer) {
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
  }
  render() {
    const { displayName, id, url } = this.props.dataGoogle;
    return (
      <Layout>
        <ChatApp username={displayName} photo={url} id={id} />
      </Layout>
    );
  }
}

Index.propTypes = {
  dataGoogle: PropTypes.object.isRequired
};

export default Index;
