module.exports = (app) => {
  require('./auth.routes')(app),
  require('./user.routes')(app),
  require('./groups.routes')(app),
  require('./poll.routes')(app),
  require('./vote.routes')(app)
}