const { jwt_mid, groups_mid } = require('../middlewares')
const userController = require('../controllers/user.controller')

module.exports = (app) => {
  app.use( (req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.use(jwt_mid.verifyToken);

  app.post('/teste', groups_mid.checkAdmin , userController.teste)
  // (req, res) => {
    // userController.joinGroup(req.userId, '123123123', 'admin');
  // })
}