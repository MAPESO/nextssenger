// Middleware
const withSession = require('./lib/middleware/session');
const withBodyParser = require('./lib/middleware/bodyParser');

// Uitls
const baseTemplate = require('./lib/utils/baseTemplate');

const existingUser = req => {
  const { user } = req.session;
  if (user) {
    return user;
  }
  return null;
};

module.exports = withSession(
  withBodyParser((req, res) => {
    const user = existingUser(req);
    if (user) {
      const { displayName, url } = JSON.parse(user);
      const urlHd = url.replace('s100', 's500');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        baseTemplate(
          `<header>
          <img 
            class="user_picture" 
            src=${urlHd} 
            alt=${displayName}
          />
          <p>Welcome back <b>${displayName}</b> !!</p>

          <p>
            <a href="/messages">View messages</a>
          </p>

          <p>
             <form action="/message/add" method="POST">
                <input
                  name="message"
                  placeholder="Type here..."
                  type="text"
                  required
                >
                <button>Send</button>
             </form>
          </p>

          <form action="/logout" method="POST">
              <button class="btn_logout">Log Out</button>
          </form>
      </header>`
        )
      );
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        baseTemplate(
          `<header">
          <p>💩 <b>You are not logged in</b></p>
          <form action="/auth/google" method="POST">
              <button>Log in with Google :)</button>
          </form>
      </header>`
        )
      );
    }
  })
);
