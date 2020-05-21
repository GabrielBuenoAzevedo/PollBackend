const { auth, jwt_mid } = require('../middlewares');
const { signin, signup } = require('../controllers/auth.controller');

module.exports = function(app) {
  app.use( (req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(auth.sanitizeInput);

  app.post('/signup', [auth.checkEmptyFieldsSignUp , auth.checkUsernameAndEmail], signup);
  app.post('/signin', [auth.checkEmptyFieldsSignIn], signin);
}