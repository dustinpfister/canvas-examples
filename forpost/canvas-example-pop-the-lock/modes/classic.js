gameMod.loadMode({
    key: 'classic',
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = 30;
        game.deg.current = 25;
        game.level = 10;
        game.targets = game.level;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = hits;
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game);
            game.targets -= 1;
            if(game.targets === 0){
                game.gameOver = true;
            }
        }else{
            game.gameOver = true;
        }
    }
});
