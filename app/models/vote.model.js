const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId , required: true },
  userId: { type: mongoose.Schema.Types.ObjectId , required: true },
  option: { type: mongoose.Schema.Types.Number , required: true },
  value: { type: mongoose.Schema.Types.String , required: true },
  created: { type: mongoose.Schema.Types.Date },
  updated: { type: mongoose.Schema.Types.Date }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;