const NBA = require("nba");
var westbrook = NBA.findPlayer('Russell Westbrook');
NBA.stats.playerInfo({ PlayerID: westbrook.playerId }).then(console.log);
