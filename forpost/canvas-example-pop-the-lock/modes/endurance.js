gameMod.loadMode({
    key: 'endurance',
    init: function(game){
        game.deg.perSec = 20;
        //game.deg.target = getTargetRandom(game);
    },
    update: function(game){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
    },
    onMiss: function(game){
        game.missTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game); //newTarget(game);
            game.level += 1;
            game.level = game.level > 100 ? 100 : game.level;
            game.deg.perSec = 20 + Math.round( 80 * (game.level / 100));
        }else{
            game.gameOver = true;
        }
    }
});
