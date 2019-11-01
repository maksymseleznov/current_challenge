module.exports = {
 contentTypeCheck: (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (!contentType || contentType.indexOf('application/json') === -1)
    return res.status(400).send('content-type must be application/json');
  next();
 }
}