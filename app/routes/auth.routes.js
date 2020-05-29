const { auth_mid, jwt_mid } = require('../middlewares');
const { signin, signup } = require('../controllers/auth.controller');

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(auth_mid.sanitizeInput);

  app.post('/signup', [auth_mid.checkEmptyFieldsSignUp , auth_mid.checkUsernameAndEmail], signup);
  app.post('/signin', [auth_mid.checkEmptyFieldsSignIn], signin);
}