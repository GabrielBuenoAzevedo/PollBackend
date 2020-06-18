const { User } = require('../models')

exports.getTokenUser = async (req, res, next) => {
  if (!req.userId){
    res.status(505).send({error: 'UserId não encontrado no token oferecido.'})
    return;
  }
  const user = await User.findById(req.userId).exec();
  req.dbData.user = user;
  next();
}