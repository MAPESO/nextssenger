// Middleware
const withSession = require('./lib/middleware/session');

const existingUser = req => {
  const user = req.session.user;
  if (user) {
    return user;
  }
  return null;
};

module.exports = withSession((req, res) => {
  const user = existingUser(req);
  if (user) {
    const {
      displayName,
      image: { url }
    } = JSON.parse(user);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
    <header style="text-align: center; font-family: sans-serif;">
      <img src=${url} alt=${displayName} width=${100} height=${100}>
      <p>🎉Welcome back, <b>${displayName}</b>!!</p>
    </header>
    `);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
    <header style="text-align: center; font-family: sans-serif;">
        <p>💩 <b>You are not logged in.</b></p>
        <p><a href="/auth/google">Log in with Google :)</a></p>
    </header>`);
  }
});
