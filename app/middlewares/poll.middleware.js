const { User, Group, Poll } = require('../models');
const { check } = require('express-validator');

//Check if user is on the group
exports.checkUserGroup = async (req, res, next) => {
  const user = await User.findById(req.userId).exec();
  const userRole = user.groups.get(req.body.groupId);
  if (userRole !== undefined) {
    next();
  } else {
    res.status(401).send({ message: 'Not authorized to perform this action.' });
  }
}

//Check fields
exports.validator = (functionName) => {
  switch (functionName) {
    case 'createPoll': return [
      check('name').not().isEmpty(),
      check('description').not().isEmpty(),
      check('options').not().isEmpty(),
      // check('start').not().isEmpty(),
      // check('end').not().isEmpty(),
      // check('categories').not().isEmpty(),
      check('groupId').not().isEmpty()
    ];
  }
}