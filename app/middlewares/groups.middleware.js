const { Group, User } = require('../models');
const { check } = require('express-validator');

//Check if user is this group admin.
exports.checkAdmin = async(req, res, next) => {
  const user = req.dbData.user;
  const role = user.groups.get(req.body.groupId);
  if (role !== 'admin') { 
    res.status(401).send({ error: 'Not authorized to perform this action.' });
    return;
  }
  next()
}

//Queries database to check if groupId exists.
exports.getGroup = async (req, res, next) => {
  const group = await Group.findById(req.body.groupId).exec();
  if (group === null) {
    res.status(505).send({error: 'Given group doesn\'t exist.'});
  }
  req.dbData.group = group;
  next();
}

//Validate fields in each function
exports.validator = (functionName) => {
  switch(functionName){
    case 'editGroup' : {
      return [
        check('description', 'Descrição tá vazia').not().isEmpty()
      ];
    }
  }
}