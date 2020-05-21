const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');

verifyToken = (req, res, next) => {
  token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'No token provided' });
  }

  jwt.verify(token, config.secret_key, (err, response) => {
    if (err){
      return res.header(401).send({ message: 'Invalid token' });
    }
    req.userId = response.id;
    next();
  });
  
}


module.exports = {
  verifyToken
}