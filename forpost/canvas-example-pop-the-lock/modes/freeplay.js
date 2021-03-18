gameMod.loadMode({
    key: 'freePlay',
    settings:[
        {
            key: 'perSec',
            disp: 'speed',
            start: 35,
            range: [10, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = modeSettings.perSec || 10;
        game.win = true;
        game.score = 0;
        game.perHitScore = 0;
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits,
        hitPer = game.clickTrack.hits / game.clickTrack.total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;

        //game.score = Math.floor( hits * hitPer * (1 - missLoss));
        game.score = game.perHitScore;
    },
    onMiss: function(modeAPI,game){
        game.missTrack.count += 1;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
           game.deg.target = modeAPI.newTarget(game);
           var hits = game.clickTrack.hits;
           var perHitScoreDelta = (1 - utils.getDimPer(hits, 0.125)) * 10;
           game.perHitScore += perHitScoreDelta;
           game.perHitScore = Number( game.perHitScore.toFixed(2) );
        }

    }
});
