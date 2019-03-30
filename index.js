// Middleware
const withSession = require('./lib/middleware/session');

// Uitls
const baseTemplate = require('./lib/utils/baseTemplate');

const existingUser = req => {
  const { user } = req.session;
  if (user) {
    return user;
  }
  return null;
};

module.exports = withSession((req, res) => {
  const user = existingUser(req);
  if (user) {
    const { displayName, url } = JSON.parse(user);
    const urlHd = url.replace('s100', 's500');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      baseTemplate(
        `<header style="text-align: center; font-family: sans-serif;">
            <img style="border-radius: 50%;" src=${urlHd} alt=${displayName} width=${100} height=${100}>
            <p>🎉Welcome back, <b>${displayName}</b>!!</p>
            <form action="/logout" method="post">
                <button type="submit">Log Out</button>
            </form>
        </header>`
      )
    );
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      baseTemplate(
        `<header style="text-align: center; font-family: sans-serif;">
            <p>💩 <b>You are not logged in</b></p>
            <form action="/auth/google" method="post">
                <button type="submit">Log in with Google :)</button>
            </form>
        </header>`
      )
    );
  }
});
