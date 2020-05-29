const { User, Group, Vote, Poll } = require('../models');

//Create or edit a vote on a poll
exports.voteInPoll = async (req, res) => {
  const option = req.body.option;
  const poll = req.mid.poll;
  const value = poll.options[option];
  if (value === undefined) {
    return res.status(505).send({message: "The selected option doesn't exist in this poll."});
  }
  //Check if vote already exists. If it exists, update existing vote, else create a new vote.
  Vote.find({ userId: req.userId, pollId: req.mid.poll._id}).then(docs => {
    const voteData = {
      userId: req.userId,
      pollId: req.mid.poll._id,
      option,
      value: value.get('value'),
      updated: new Date()
    }
    let vote;
    let message;
    if (docs.length === 0) {
      voteData.created = new Date();
      vote = new Vote(voteData);
      message = 'Successfully voted.';
    } else {
      vote = docs[0];
      vote.set(voteData);
      message = 'Successfully changed vote option.'
    }
    vote.save().then( doc => res.send({message}))
                 .catch( err => res.send({err}));
  }).catch(err => res.status(505).send({message: 'Error', error: err}));
}