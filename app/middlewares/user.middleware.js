const { User } = require('../models')

exports.getTokenUser = async (req, res, next) => {
  if (!req.userId){
    res.status(505).send({error: 'UserId not found inside given token.'})
    return;
  }
  const user = await User.findById(req.userId).exec();
  if (user === null) {
    res.status(505).send({error: 'User not found'})
  }
  req.dbData.user = user;
  next();
}