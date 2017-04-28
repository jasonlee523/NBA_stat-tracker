const NBA = require("nba");
var westbrook = NBA.findPlayer('Russell Westbrook');
var stats = NBA.stats.playerInfo({ PlayerID: westbrook.playerId }).then(sendBack);


function sendBack(a) {
  console.log(a.playerHeadlineStats[0].pts);
}

//console.log(stats.playerHeadlineStats);
//var boxScore = NBA.stats.playerSplits({PlayerID: westbrook.playerId, PerMode: "PerGame"}).then(console.log);
//console.log(boxScore);
//NBA.stats.scoreboard({gameDate: "5/24"}).then(console.log);
