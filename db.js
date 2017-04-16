const mongoose = require('mongoose');

// A User will be able to log in
const User = new mongoose.Schema({
  username: String,
  hash: String
  //lists: // an array of references to List documents
});
const Player = new mongoose.Schema({
  name: String,
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  player: String,
  points: Number,
  rebounds: Number,
  assists: Number
});
// A list is created by the user to filter out
// nba game logs according to restrictions
/*const List = new mongoose.Schema({
  user: // a reference to a User object
  name: // named by user,
  logs: [
    // game logs taken from NBA API
  ],
  createdAt: // timestamp
})*/

mongoose.model('User', User);
mongoose.model('Player', Player);
// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/jjl625';
}
mongoose.connect(dbconf);
