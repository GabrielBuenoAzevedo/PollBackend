const { User } = require('../models');

//Check if neither of the required fields are empty.
checkEmptyFieldsSignIn = (req, res, next) => {
  const { username, password, email } = req.body;
  if (username === undefined || username === null || username === '') return res.status(400).send({ message: 'Username field is empty' });
  if (password === undefined || password === null || password === '') return res.status(400).send({ message: 'Password field is empty' });
  next();
}

//Check if neither of the required fields are empty.
checkEmptyFieldsSignUp = (req, res, next) => {
  const { username, password, email } = req.body;
  if (username === undefined || username === null || username === '') return res.status(400).send({ message: 'Username field is empty' });
  if (password === undefined || password === null || password === '') return res.status(400).send({ message: 'Password field is empty' });
  if (email === undefined || email === null || email === '') return res.status(400).send({ message: 'Email field is empty' });
  next();
}

//Check if username or email is already taken.
checkUsernameAndEmail = async  (req, res, next) => {
  //Check if username exists
  const userQuery = User.findOne({ username: req.body.username });
  const userResult = await userQuery.exec();
  if ( userResult !== null ){
    res.status(500).send({ message: 'Username already taken.' });
    return;
  }

  //Check if email exists
  const emailQuery = User.findOne({ email: req.body.email });
  const emailResult = await emailQuery.exec();
  if ( emailResult !== null ){
    res.status(500).send({ message: 'Email already taken.' });
    return;
  }

  next();
} 

sanitizeInput = (req, res, next) => {
  if ( req.body.username !== null && req.body.username !== undefined)
    req.body.username = req.body.username.trim();
  if ( req.body.password !== null && req.body.password !== undefined)
    req.body.password = req.body.password.trim();
  if ( req.body.email !== null && req.body.email !== undefined)
    req.body.email = req.body.email.trim();
  next();
}

module.exports = {
  checkUsernameAndEmail,
  checkEmptyFieldsSignIn,
  checkEmptyFieldsSignUp,
  sanitizeInput
}