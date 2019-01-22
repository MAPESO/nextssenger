async function getUser (oauth2Client, code, plus) {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        const user = await plus.people.get({ userId: 'me', auth: oauth2Client });
        return user.data;
    } catch (err) {
        throw new Error(`There's been a problem with API: ${err}`);
    }
}

module.exports = getUser;
