const config = require('../../config/auth.config');
const { User } = require('../models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const functions = {};

//Create a user in the database
functions.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  });
  user.save().then( (document) => {
    res.send({ message: 'User successfully registrated!' })
  }).catch( err => {
    res.status(500).send({message: err});
  });
}

//Login into the system
functions.signin = async (req, res) => {
  //Verify if given credentials are correct
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user === null) return res.status(401).send({ message: "Username or password are not correct."});
  const passwordAccepted = bcrypt.compareSync(req.body.password, user.password);
  if (passwordAccepted === false) return res.status(401).send({ message: 'Username or password are not correct.'});
  //Return login message and token
  const token = jwt.sign({ id: user.id }, config.secret_key, { expiresIn: '24h' });
  res.status(200).send({
    ...user._doc,
    accessToken: token
  });
}

module.exports = functions;