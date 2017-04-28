var express = require('express');
var router = express.Router();
var NBA = require('nba');
var player1;
var mongoose = require('mongoose');
const User = mongoose.model('User');
const Player = mongoose.model('Player');
const List = mongoose.model('List');
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport) {
  router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

  router.get('/home', isAuthenticated, function(req, res){
    List.findOne({userId: req.user.fb.id}, function(err, list) {
      if(err) {
        console.log(err);
        res.send('an error has occured, please check the server output');
        return;
      }
      if(list === null) {
        new List({
          name: req.user.fb.firstName + ' ' + req.user.fb.lastName,
          userId: req.user.fb.id
        }).save(function(err) {
          if(err) {
            console.log(err);
            res.send('an error has occured, please check the server output');
            return;
          }
        });
      }
    })
    res.render('home', { user: req.user });
  });

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/login/facebook',
		passport.authenticate('facebook', { scope : 'email' }
	));

	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);

  router.get('/create', (req, res) => {
    if(req.user) {
      res.render('create');
    }
    else {
      res.redirect('home');
    }
  });

  router.post('/create', (req, res) => {
		if(req.user) {
			var find = NBA.findPlayer(req.body.name);
			var stats = NBA.stats.playerInfo({PlayerID: find.playerId}).then(sendBack);

			function sendBack(a) {
				var point = a.playerHeadlineStats[0].pts;
				var assist = a.playerHeadlineStats[0].ast;
				var rebound = a.playerHeadlineStats[0].reb;
				List.findOne({userId: req.user.fb.id}, function(err, list) {
					list.players.push({name: req.body.name, points: point, assists: assist, rebounds: rebound});
					list.save(function(err) {
						if(err) {
							console.log(err);
						}
					})
				});
			}
		}
    res.redirect('/create');
  });

  router.get('/view-players', (req, res) => {
		if(req.user) {
    	List.findOne({userId: req.user.fb.id}, function(err, list) {
				var pointSum = list.players.reduce(function(acc, ele) {
					return acc + ele.points;
				}, 0);
				var assistSum = list.players.reduce(function(acc, ele) {
					return acc + ele.assists;
				}, 0);
				var reboundSum = list.players.reduce(function(acc, ele) {
					return acc + ele.rebounds;
				}, 0);
				console.log(pointSum+' '+assistSum+' '+reboundSum);
      	res.render('ajax', {
        	players: list.players,
					pointSum: pointSum,
					assistSum: assistSum,
					reboundSum: reboundSum
      	});
    	});
		}
		else {
			res.redirect('/home');
		}
  });

	router.get('/api/view-players', (req, res) => {
		if(req.user) {
			List.findOne({userId: req.user.fb.id}, function(err, list) {
				res.json(list.players.map(function(ele) {
					if(ele.points >= req.query.pts && ele.assists >= req.query.ast && ele.rebounds >= req.query.reb) {
						return {
							"name": ele.name,
							"points": ele.points,
							"assists": ele.assists,
							"rebounds": ele.rebounds,
						};
					}
				}));
			});
		}
		else {
			res.redirect('/home');
		}
	});

	router.get('/delete', (req, res) => {
		if(req.user) {
			res.render('delete');
		}
		else {
			res.redirect('home');
		}
	});

	router.post('/delete', (req, res) => {
		if(req.user) {
			List.findOne({userId: req.user.fb.id}, function(err, list) {
				list.players = list.players.filter(function(ele) {
					return ele.name !== req.body.name;
				});
				list.save(function(err) {
					if(err) {
						console.log(err);
					}
				})
			});
			res.redirect('/delete');
		}
		else {
			res.redirect('/home');
		}
	});

  return router;
}
