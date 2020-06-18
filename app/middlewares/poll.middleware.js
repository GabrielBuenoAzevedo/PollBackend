const { User, Group, Poll } = require('../models');
const { check } = require('express-validator');

//Check if user is on the group
exports.checkUserGroup = async (req, res, next) => {
  const user = req.dbData.user;
  const userRole = user.groups.get(req.body.groupId);
  if (userRole !== undefined) {
    next();
  } else {
    res.status(401).send({ message: 'Not authorized to perform this action.' });
  }
}

//Check if poll exists
exports.checkPoll = async (req, res, next) => {
  const poll = Poll.findById(req.body.pollId).then( poll => {
    if (poll !== null) {
      req.mid = {
        ...req.mid,
        poll
      };
      next();
    } else {
      res.status(502).send({message: "This poll doesn't exist."});
    }
  })
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