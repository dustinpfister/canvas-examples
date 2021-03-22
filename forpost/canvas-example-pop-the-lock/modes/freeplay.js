gameMod.loadMode({
    // each game mode should have a key
    key: 'freePlay',
    // gameMode state settings for modeSettings object
    settings:[
        {
            key: 'perSec',
            disp: 'speed',
            start: 35,
            range: [10, 40]
        },
        {
            key: 'tripUpChance',
            disp: 'Trip Up Chance',
            start: 12,
            range: [0, 100]
        }
    ],
    // what to do each time a new game object is created in gameMod.create
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;
        game.deg.perSec = modeSettings.perSec || 10;
        game.tripUp.count = 5;
        game.tripUp.chance = (modeSettings.tripUpChance / 100) || 0;
        game.win = true;
        game.score = 0;
        game.perHitScore = 0;
        // base bonus effect by speed setting
        game.baseBonus = 100 + Math.round(300  * ((modeSettings.perSec - 10) / (100 - 10)));
        // animation stuff
        game.cirSmall = {
            frame: 0,
            fps: 2,
            secs: 0
        };
        game.cirBig = {
            frame: 0,             // 0 or 1 for ani object in mr-sun.js
            aniKey: 'circle_big', // 'circle_big', 'circle_big_miss'
            secs: 0               // secs to wait until setting back to frame 0
        };
    },
    update: function(modeAPI, game, secs){
        var hits = game.clickTrack.hits,
        total = game.clickTrack.total,
        hitPer = game.clickTrack.hits / total,
        missLoss = 1 - (1 / (game.missTrack.count + 1));
        hitPer = utils.isNaN(hitPer) ? 1 : hitPer;
        var bonus = Math.floor( game.baseBonus * hitPer * (1 - missLoss)) * (total < 100 ? total / 100: 1);
        game.score =  Math.floor(game.perHitScore + bonus);
        // small circle animation frame update
        var cs = game.cirSmall;
        cs.secs += secs;
        if(cs.secs > 1 / cs.fps){
           cs.frame += 1;
           cs.frame = utils.mod(cs.frame, 4);
           cs.secs = utils.mod(cs.secs, 1 / cs.fps);
        }
        // big circle animation
        game.cirBig.frame = 0;
        if(game.cirBig.secs > 0){
            game.cirBig.frame = 1;
            game.cirBig.secs -= secs;
        }
    },
    onMiss: function(modeAPI,game){
        game.missTrack.count += 1;
    },
    onClick: function(modeAPI, game){
        game.cirBig.secs = 0.25;
        if (game.inRange) {
           game.deg.target = modeAPI.newTarget(game);
           var hits = game.clickTrack.hits;
           var perHitScoreDelta = (1 - utils.getDimPer(hits, 0.125)) * 10;
           game.perHitScore += perHitScoreDelta;
           game.perHitScore = Number( game.perHitScore.toFixed(2) );
           game.perHitScore = game.perHitScore >= 100 ? 100: game.perHitScore;
           game.cirBig.aniKey = 'circle_big';
        }else{
           game.cirBig.aniKey = 'circle_big_miss';
        }
    },
    // not used by game.js, but used in draw.js
    background: 'gray',
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, Math.random());
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        draw.baseCircle_pixmap(ctx, sm, 'mrsun', sm.game.cirBig.aniKey, sm.game.cirBig.frame);
        draw.baseCircle(ctx, sm.canvas, 'black');
        draw.targetRange(ctx, sm.canvas, sm.game);
        draw.current_pos_pixmap(ctx, sm, 'mrsun', 'circle_small', 32, sm.game.cirSmall.frame);
        draw.score(ctx, canvas, sm);
    }
});
