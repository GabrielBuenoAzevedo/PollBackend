const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  name: String,
  description: String,
  userId: mongoose.Schema.Types.ObjectId,
  groupId: mongoose.Schema.Types.ObjectId,
  options:[ mongoose.Schema.Types.Map ],
  categories: [ String ],
  start: Date,
  end: Date
});

const Poll = mongoose.model(
  "Poll",
  pollSchema
);

module.exports = Poll;