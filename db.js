const mongoose = require('mongoose');

// A User will be able to log in
const User = new mongoose.Schema({
  username: // name,
  hash: // a password hash,
  lists: // an array of references to List documents
})
// A list is created by the user to filter out
// nba game logs according to restrictions
const List = new mongoose.Schema({
  user: // a reference to a User object
  name: // named by user,
  logs: [
    // game logs taken from NBA API
  ],
  createdAt: // timestamp
})

mongoose.model('User', User);
mongoose.model('List', List);

mongoose.connect('mongodb://localhost/nbatracker');
