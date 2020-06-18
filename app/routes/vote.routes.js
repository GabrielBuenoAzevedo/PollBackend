const { voteInPoll } = require('../controllers/vote.controller');
const { poll_mid, jwt_mid } = require('../middlewares');

module.exports = (app) => {
  app.use( (req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.use(jwt_mid.verifyToken);

  app.post('/pollVote', poll_mid.getPoll, voteInPoll)
}