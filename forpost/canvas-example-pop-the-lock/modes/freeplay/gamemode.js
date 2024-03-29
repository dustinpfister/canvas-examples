gameMod.loadMode({
    // each game mode should have a key
    key: 'freePlay',
    // gameMode state settings for modeSettings object
    settings:[
        {
            key: 'perSec',
            disp: 'Speed',
            start: 10,
            range: [10, 100]
        },
        {
            key: 'margin',
            disp: 'Margin',
            start: 20,
            range: [0, 20]
        },
        {
            key: 'tripUpChance',
            disp: 'Trip Up Chance',
            start: 10,
            range: [0, 100]
        },
        {
            key: 'tripUpRange',
            disp: 'Trip Up Range',
            start: 35,
            range: [0, 100]
        }
    ],
    // what to do each time a new game object is created in gameMod.create
    init: function(modeAPI, game, modeSettings){

        // make sure of
        game.hp.active = false;
        game.win = true;
        game.score = 0;
        game.perHitScore = 0;

        // fixed speed set by user
        game.deg.perSec = modeSettings.perSec || 10;

        // fixed margin setting set by user
        var deg = game.deg.total * 0.1;
        game.deg.margin = deg - modeSettings.margin / 20 * (deg - 1) || 1;

        // user trip up settings
        game.tripUp.count = 0;
        game.tripUp.chance = (modeSettings.tripUpChance / 100) || 0;
        var tpRangePer = 1 - (modeSettings.tripUpRange / 100);
        game.tripUp.degRange = [10 + Math.round(15 * tpRangePer), 18 + Math.round(32 * tpRangePer)];
        game.tripUp.countRange = [4, 12];

        // delay mode settings
        game.delayMode.delay = 3;

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
        missLoss = 1 - (1 / (game.lateTrack.count + 1));
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
    onLate: function(modeAPI,game){
        game.lateTrack.count += 1;
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
        // debug info
        if(sm.debugMode){
            ctx.fillStyle = 'white';
            ctx.font = '10px arial';
            ctx.textAlign = 'left';
            ctx.textbaseline = 'top';
            ctx.fillText('deg.current: ' + sm.game.deg.current.toFixed(2) , 10, 20);
            ctx.fillText('deg.delta: ' + sm.game.deg.delta.toFixed(2) , 10, 30);
            ctx.fillText('deg.deltaTop: ' + sm.game.deg.deltaTop.toFixed(2) , 10, 40);
            ctx.fillText('deg.totalDist: ' + sm.game.deg.distance.toFixed(2) + '/' + sm.game.deg.totalDist.toFixed(2) , 10, 50);
            ctx.fillText('game.dir: ' + sm.game.dir , 10, 60);
            ctx.fillText('base bonus score: ' + sm.game.baseBonus , 10, 70);
        }
    }
});
