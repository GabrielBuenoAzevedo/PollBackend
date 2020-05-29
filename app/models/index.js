const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  mongoose,
  User: require('./user.model'),
  Role: require('./role.model'),
  Group: require('./group.model'),
  Poll: require('./poll.model'),
  Vote: require('./vote.model')
};