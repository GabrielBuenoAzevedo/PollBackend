const auth_mid = require('./auth.middleware');
const jwt_mid = require('./jwt.middleware');
const groups_mid = require('./groups.middleware');
const poll_mid = require('./poll.middleware');
const user_mid = require('./user.middleware');

module.exports = {
  auth_mid,
  jwt_mid,
  groups_mid,
  poll_mid,
  user_mid
};