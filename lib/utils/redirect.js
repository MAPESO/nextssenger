function redirect(res, code, url) {
  if (!res) {
    throw new Error('res: is required');
  }

  if (!code) {
    throw new Error('code: is required');
  }

  if (!url) {
    throw new Error('url: is required');
  }
  res.statusCode = code;
  res.setHeader('Location', url);
  res.end();
}

module.exports = redirect;
