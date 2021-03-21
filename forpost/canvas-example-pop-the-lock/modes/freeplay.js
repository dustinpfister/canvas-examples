gameMod.loadMode({
    // each game mode should have a key
    key: 'freePlay',
    // gameMode state settings for modeSettings object
    settings:[
        {
            key: 'perSec',
            disp: 'speed',
            start: 35,
            range: [10, 100]
        }
    ],
    // what to do each time a new game object is created in gameMod.create
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = modeSettings.perSec || 10;
        game.win = true;
        game.score = 0;
        game.perHitScore = 0;
        // base bonus effect by speed setting
        game.baseBonus = 100 + Math.round(300  * ((modeSettings.perSec - 10) / (100 - 10)));
        console.log( game.baseBonus );
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits,
        total = game.clickTrack.total,
        hitPer = game.clickTrack.hits / total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
        var bonus = Math.floor( game.baseBonus * hitPer * (1 - missLoss)) * (total < 100 ? total / 100: 1);
        game.score =  Math.floor(game.perHitScore + bonus);
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
           game.perHitScore = game.perHitScore >= 100 ? 100: game.perHitScore;
        }
    },
    // not used by game.js, but used in draw.js
    background: 'gray',
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, Math.random());
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.PTL_pixmap(ctx, canvas, sm.game, sm);
        draw.score(ctx, canvas, sm);
    }
});
