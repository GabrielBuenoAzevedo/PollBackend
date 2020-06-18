const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  groups: { type: Map } 
});

//Inserts the groupid into the groups array.
userSchema.methods.joinGroup = async function (groupId, role) {
  groupId = String(groupId);
  if (this.groups === undefined ) {
    this.groups = {}
  }
  this.groups.set(groupId, role);
  this.save();
}

//Remover the groupid from the groups array.
userSchema.methods.leaveGroup = async function (groupId) {
  groupId = String(groupId);
  if (!this.groups.has(groupId))
    return { success: false, message: "User doesn't participate in this group." };
  this.groups.delete(groupId);
  this.save();
  return { success: true, message: "User successfully left the group. "};
}

const User = mongoose.model(
  "User", 
  userSchema
);
module.exports = User;