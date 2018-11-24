/* eslint no-console: 0 */
// Packages
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('now-env');
require('./passport_config/passport')(passport);

const app = express();
const port = process.env.PORT || 8000;

// middleware necessary to save the persistent session
app.use(
  cookieSession({
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000
  })
);

// middleware that are necessary for passport
app.use(passport.initialize());
app.use(passport.session());

const getUser = req => {
  const user = req.user;
  if (user) {
    return user;
  }
  return null;
};

app.get('/', (req, res) => {
  const username = getUser(req);
  if (username) {
    res.send(`
      <header style="text-align: center; font-family: sans-serif;">
        <p>🎉 Welcome back, <b>${username.displayName}</b></p>
        <a href="logout">Log Out</a>
      </header>
    `);
    res.end();
  } else {
    res.send(`
    <header style="text-align: center; font-family: sans-serif;">
        <p>💩 <b>You are not logged in.</b></p>
        <p><a href="/auth/google">Log in with Google</a></p>
    </header>
    `);
    res.end();
  }
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`𝚫 Ready On Server http://localhost:${port}`);
});
