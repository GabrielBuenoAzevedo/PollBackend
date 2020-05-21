const { User, Group } = require('../models');

//Create a group
exports.createGroup = (req, res) => {
  const group = new Group({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories.length > 0 ? req.body.categories.split(',') : [],
    public: req.body.public === 'true'
  });
  return group.save().then( async doc => {
    console.log(doc);
    const user = await User.findById(req.userId).exec();
    user.joinGroup(doc.id, 'admin');
    res.send({ message: 'Group created! '});
  }).catch( err => {
    res.status(400).send({ message: err});
  })
}



