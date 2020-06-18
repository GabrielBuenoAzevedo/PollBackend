const { Group, Poll } = require('../models');
const { validationResult } = require('express-validator');

//Create poll
exports.createPoll = (req, res) => {
  const validation = validationResult(req);
  if (validation.errors.length === 0 ) {
    let options = req.body.options.split(',');
    let optionsObj = options.map( option => { return {value: option} });

    const poll = new Poll({
      name: req.body.name,
      description: req.body.description,
      options: optionsObj,
      start: req.body.start,
      end: req.body.end,
      categories:  req.body.categories.length !== 0 ? req.body.categories.split(',') : null,
      userId: req.userId,
      groupId: req.body.groupId
    });
    poll.save();
    res.send({ message: 'Poll successfully created.'});
  } else {
    res.send( {message: 'There are errors', errors: validation.errors})
  }
}