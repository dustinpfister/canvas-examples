gameMod.loadMode({
    key: 'endurance',
    init: function(modeAPI, game){
        game.hp.active = true;
        game.hp.current = game.hp.max;
        game.deg.perSec = 20;
        game.deg.current = 25;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI,game){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
        if(game.hp.current <= 0){
            game.gameOver = true;
        }
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count += 1;
        game.hp.current -= 1;
        //game.gameOver = true;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game); //newTarget(game);
            game.level += 1;
            game.level = game.level > 100 ? 100 : game.level;
            game.deg.perSec = 20 + Math.round( 80 * (game.level / 100));
        }else{
            game.hp.current -= 1;
        }
    }
});
