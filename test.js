const NBA = require("nba");
var westbrook = NBA.findPlayer('Russell Westbrook');
NBA.stats.playerSplits({ Season: "2016-17", PlayerID: westbrook.playerId, PerMode: "PerGame" }).then(console.log);
