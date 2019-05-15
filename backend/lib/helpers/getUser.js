// This function is responsible for obtaining the
// token how to get the "Google People" data
async function getUser(oauth2Client, code, people) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const user = await people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos'
    });
    const { names, photos } = user.data;
    const { displayName } = names[0];
    const { url } = photos[0];

    return {
      displayName,
      url
    };
  } catch (err) {
    throw new Error(`There's been a problem with API: ${err}`);
  }
}

module.exports = getUser;
