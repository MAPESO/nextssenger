import React, { Component } from 'react';
import Layout from '../components/Layout';
import Cookies from 'cookies';

class Index extends Component {
    static async getInitialProps({ req, res }) {
        const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2] });
        const isCookie = cookies.get('from-user-google', { signed: true });
        if(Object.is(isCookie, undefined)) {
            res.writeHead(303, { Location: '/login' });
            res.end();
        }
        return { isCookie }
    }
    render () {
        const { displayName, url } = JSON.parse(this.props.isCookie);
        return (
            <Layout>
                <h1>Welcome to Nextssenger {displayName} !! </h1>
            </Layout>
        );
    }
}

export default Index;
