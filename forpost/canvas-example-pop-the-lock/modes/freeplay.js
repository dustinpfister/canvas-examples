gameMod.loadMode({
    key: 'freePlay',
    init: function(modeAPI, game){
        game.deg.perSec = 30;
    },
    update: function(modeAPI, game){
        var hitPer = game.clickTrack.hits / game.clickTrack.total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
        game.score = Math.floor(game.clickTrack.hits * hitPer * (1-missLoss));
    },
    onMiss: function(modeAPI,game){
        game.missTrack.count += 1;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
           game.deg.target = modeAPI.newTarget(game);
        }
    }
});
