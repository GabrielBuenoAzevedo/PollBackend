const { Group, User } = require('../models');
const { check } = require('express-validator')

//Check if user is this group admin
exports.checkAdmin = async(req, res, next) => {
  const user = await User.findById(req.userId).exec();
  const role = user.groups.get(req.body.groupId);
  if (role !== 'admin') { 
    res.status(401).send({ error: 'Not authorized to perform this action.' });
    return;
  }
  next()
}

exports.validator = (functionName) => {
  switch(functionName){
    case 'editGroup' : {
      return [
        check('description', 'Descrição tá vazia').not().isEmpty()
      ];
    }
  }
}