const { Group } = require('../models');
const { validationResult } = require('express-validator');

//Create a group
exports.createGroup = (req, res) => {
  const group = new Group({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories.length > 0 ? req.body.categories.split(',') : [],
    public: req.body.public === 'true'
  });
  return group.save().then( async doc => {
    const user = req.dbData.user;
    user.joinGroup(doc.id, 'admin');
    res.send({ message: 'Group created! '});
  }).catch( err => {
    res.status(400).send({ message: err});
  })
}

//Edit a group
exports.editGroup = async (req, res) => {
  const validation = validationResult(req);
  if (validation.errors.length === 0) {
    const group = req.dbData.group;
    group.set({
      name: req.body.name ? req.body.name : group.name,
      description: req.body.description ? req.body.description : group.description,
      categories: req.body.categories ? req.body.categories.split(',') : group.categories,
      public: group.public ? req.body.public : group.public
    });
    group.save();
    res.send( { message: 'Group successfully updated. '});
  } else {
    console.log('Possui erros: ');
    res.status(500).send(validation.errors);
  }
}

