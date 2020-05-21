const { Group, User } = require('../models');

//Check if user is this group admin
exports.checkAdmin = async(req, res, next) => {
  const user = await User.findById(req.userId).exec();
  const role = user.groups.get(req.body.groupId);
  console.log(role);
  if (role !== 'admin') { 
    res.status(401).send({ error: 'Not authorized to perform this action.' });
    return;
  }
  next()
}

