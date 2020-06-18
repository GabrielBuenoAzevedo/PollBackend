const { groups_mid, jwt_mid, user_mid } = require('../middlewares');
const { createGroup, editGroup } = require('../controllers/groups.controller');

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(jwt_mid.verifyToken)
  
  app.post('/createGroup', [ user_mid.getTokenUser ], createGroup);
  app.post('/editGroup', [ groups_mid.validator('editGroup'), user_mid.getTokenUser, groups_mid.checkAdmin ], editGroup);
  // app.post('/signin', [auth.checkEmptyFieldsSignIn], signin);
}