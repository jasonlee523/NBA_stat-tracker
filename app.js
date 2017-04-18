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
    athlete: req.body.athlete,
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
      player1 = req.body.athlete;
      res.redirect('/stats');
    }
  })
});

app.post('/ajax1',(req,res) => {
  var player1 = Object.keys(req.body)[0];
  var player_ = NBA.findPlayer(player1);
  var numbers = NBA.stats.playerInfo({ PlayerID: player_.playerId }).then(sendBack);

  function sendBack(a) {
    var b = a.playerHeadlineStats[0];
    res.send(b);
  }

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
app.get('/view-players', (req, res) => {
  Player.find(function(err, players) {
    console.log(players);
    res.render('ajax', {
      players: players
    });
  });
});
function ajaxPost(form, callback) {
    var url = form.action,
        xhr = new XMLHttpRequest();

    //This is a bit tricky, [].fn.call(form.elements, ...) allows us to call .fn
    //on the form's elements, even though it's not an array. Effectively
    //Filtering all of the fields on the form
    var params = [].filter.call(form.elements, function(el) {
        //Allow only elements that don't have the 'checked' property
        //Or those who have it, and it's checked for them.
        return typeof(el.checked) === 'undefined' || el.checked;
        //Practically, filter out checkboxes/radios which aren't checekd.
    })
    .filter(function(el) { return !!el.name; }) //Nameless elements die.
    .filter(function(el) { return el.disabled; }) //Disabled elements die.
    .map(function(el) {
        //Map each field into a name=value string, make sure to properly escape!
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
    }).join('&'); //Then join all the strings by &

    xhr.open("POST", url);
    // Changed from application/x-form-urlencoded to application/x-form-urlencoded
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //.bind ensures that this inside of the function is the XHR object.
    xhr.onload = callback.bind(xhr);

    //All preperations are clear, send the request!
    xhr.send(params);
}
/*function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}*/
app.listen(process.env.PORT || 3000);
