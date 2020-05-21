const { auth, jwt_mid } = require('../middlewares');
const { createGroup } = require('../controllers/groups.controller');

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(jwt_mid.verifyToken)

  app.post('/createGroup', createGroup);
  // app.post('/signin', [auth.checkEmptyFieldsSignIn], signin);
}