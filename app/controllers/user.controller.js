const { User } = require('../models');


exports.teste = (req, res) => {
  User.findById(req.userId).exec( (err, user) => {
    user.joinGroup('5ec5c25bd9ca2f9260a1f014', 'admin')
    res.send('aoopa');
  })
}