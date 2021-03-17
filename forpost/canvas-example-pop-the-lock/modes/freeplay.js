gameMod.loadMode({
    key: 'freePlay',
    settings:[
        {
            key: 'perSec',
            disp: 'speed',
            start: 10,
            range: [10, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = modeSettings.perSec || 10;
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
