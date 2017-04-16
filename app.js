require('./db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const User = mongoose.model('User');
const Player = mongoose.model('Player');
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
app.get('/playerstats', (req, res) => {
  res.render('playerStats');
});
app.post('/playerstats', (req, res) => {
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
      res.redirect('/playerstats');
    }
  })
})

app.listen(process.env.PORT || 3000);
