const mongoose = require('mongoose');

// A User will be able to log in
const User = new mongoose.Schema({
  fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String,
	}
});
const Player = new mongoose.Schema({
  name: String,
  points: Number,
  assists: Number,
  rebounds: Number
});
const List = new mongoose.Schema({
  name: String,
  userId: String,
  players: [Player]
});

mongoose.model('User', User);
mongoose.model('Player', Player);
mongoose.model('List', List);
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
