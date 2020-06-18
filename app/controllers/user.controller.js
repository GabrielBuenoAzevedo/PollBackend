const { User } = require('../models');

//Makes user leave a group.
exports.leaveGroup = (req, res) => {
  const user = req.dbData.user;
  const group = req.dbData.group;
  user.leaveGroup(group._id)
    .then( result => res.send({message: result.message}) )
    .catch( err => {throw err} );
}