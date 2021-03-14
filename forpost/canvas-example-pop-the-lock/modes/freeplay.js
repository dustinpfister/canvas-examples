gameMod.loadMode({
    key: 'freePlay',
    init: function(game){
        game.deg.perSec = 30;
    },
    update: function(game){
        var hitPer = game.clickTrack.hits / game.clickTrack.total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
        game.score = Math.floor(game.clickTrack.hits * hitPer * (1-missLoss));
    },
    onMiss: function(game){
        game.missTrack.count += 1;
    },
    onClick: function(game){
        if (game.inRange) {
           game.deg.target = newTarget(game);
        }
    }
});
