const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categories: { type: Array },
  public: Boolean
});

const Group = mongoose.model(
  "Group",
  groupSchema
);

module.exports = Group;