// Packages
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = fn => {
  return (req, res) => {
    jsonParser(req, res, () => {
      urlencodedParser(req, res, () => fn(req, res));
    });
  };
};
