require('./db');
const NBA = require('nba');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
const User = mongoose.model('User');
const Player = mongoose.model('Player');
var player1;
// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', (req, res) => {
  new User({
    username: req.body.username,
    hash: req.body.password
  }).save(function(err) {
    if(err) {
      console.log(err);
      res.send('an error has occured, please check the server output');
      return;
    }
    else {
      res.redirect('/register');
    }
  });
});
app.get('/create', (req, res) => {
  res.render('create');
});
app.post('/create', (req, res) => {
  new Player({
    name: req.body.name,
    player: req.body.player,
    points: req.body.points,
    rebounds: req.body.rebounds,
    assists: req.body.assists
  }).save(function(err) {
    if(err) {
      console.log(err);
      res.send('an error has occured, please check the server output');
      return;
    }
    else {
      player1 = req.body.player;
      res.redirect('/stats');
    }
  })
});
app.get('/stats', (req, res) => {
  var player_ = NBA.findPlayer(player1);
  var numbers = NBA.stats.playerInfo({ PlayerID: player_.playerId }).then(x);

  function x(a) {
    var b = a.playerHeadlineStats[0];
    console.log(b);
    res.render('stats', {points: b.pts, assists: b.ast, rebounds: b.reb});
  }
});
app.listen(process.env.PORT || 3000);
