gameMod.loadMode({
    key: 'classic',
    settings: [
        {
            key: 'level',
            disp: 'Level',
            range: [1, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = 20;
        game.deg.current = 25;
        game.tripUp.chance = 0.1;
        game.tripUp.degRange = [20, 30];

        game.perSecLower = 20;
        game.perSecHigher = 70

        modeSettings.level = game.level = modeSettings.level || 1;
        game.targets = game.level;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = hits;
        game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * (hits / 100));
        game.deg.perSec = game.deg.perSec > game.perSecHigher ? game.perSecHigher : game.deg.perSec;
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.newTarget(game);
            game.targets -= 1;
            if(game.targets === 0){
                modeSettings.level += 1;
                modeSettings.level = modeSettings.level > 100 ? 100: modeSettings.level;
                game.gameOver = true;
                game.win = true;
            }
        }else{
            game.gameOver = true;
        }
    }
});
