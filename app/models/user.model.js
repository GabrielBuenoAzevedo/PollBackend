const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  groups: { type: Map } 
});

//Inserts the groupid into the groups array.
userSchema.methods.joinGroup = async function (groupId, role) {
  groupId = String(groupId)
  if (this.groups === undefined ) {
    this.groups = {}
  }
  this.groups.set(groupId, role);
  this.save();
}

const User = mongoose.model(
  "User", 
  userSchema
);
module.exports = User;