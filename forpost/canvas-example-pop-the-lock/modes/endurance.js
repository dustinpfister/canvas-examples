gameMod.loadMode({
    key: 'endurance',
    settings:[],
    init: function(modeAPI, game){
        game.hp.active = true;
        game.hp.current = game.hp.max * 0.5;
        game.hp.perSec = 0.8;
        game.deg.perSec = 20;
        game.deg.current = 25;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game, secs){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
        if(game.hp.current <= 0){
            game.gameOver = true;
        }else{
            game.hp.current += game.hp.perSec * secs;
            game.hp.current = game.hp.current >= game.hp.max ? game.hp.max : game.hp.current;
        }
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count += 1;
        game.hp.current -= 1;
    },
    onClick: function(modeAPI, game){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game);
            game.level += 1;
            game.level = game.level > 100 ? 100 : game.level;
            game.deg.perSec = 20 + Math.round( 120 * (game.level / 140));
        }else{
            game.hp.current -= 1;
        }
    }
});
