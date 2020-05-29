const { poll_mid, jwt_mid } = require('../middlewares');
const { createPoll } = require('../controllers/poll.controller');

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(jwt_mid.verifyToken);

  app.post('/createPoll', [ poll_mid.validator('createPoll'), poll_mid.checkUserGroup ], createPoll );
}