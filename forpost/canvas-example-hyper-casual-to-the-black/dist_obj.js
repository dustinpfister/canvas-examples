// set state distance based on startTime
// and distObj of PPS and time key pairs
var setDistance = function(game, now){

    // before I credit I first need to know the amount of time
    // and distance thus far
    var storedSecs = 0,
    storedDist = 0;
    Object.keys(game.distObj).forEach(function(pps){
        var secs = game.distObj[pps];
        storedSecs += secs;
        storedDist += Number(pps) * secs;
    });

    // now I can subtract storedSecs from secs and
    // use that to set Delta distance for current PPS
    var secs = (now - game.startTime) / 1000 - storedSecs,
    deltaDist = game.pps * secs;

    // update distObj for current PPS
    var current = game.distObj[game.pps];
    game.distObj[game.pps] = current === undefined ? secs : current + secs; 

    // now I can set distance
    game.distance = storedDist + deltaDist;

};


var game = {
    startTime: startTime = new Date(2020, 8, 18, 10),
    pps: 128,
    distance: 0,
    distObj: {
        32: 1000,
        64: 1600
    }
};

setDistance(game, new Date(2020, 8, 18, 11));

console.log(game);
