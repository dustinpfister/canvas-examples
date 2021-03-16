gameMod.loadMode({
    key: 'freePlay',
    settings:[],
    init: function(modeAPI, game){
        game.hp.active = false;
        game.deg.perSec = 30;
        game.win = true;
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
