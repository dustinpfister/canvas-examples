gameMod.loadMode({
    key: 'suddendeath',
    settings:[
        {
            key: 'levelStart',
            disp: 'Start Level',
            start: 1,
            range: [1, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){

        // basic settings
        game.hp.active = false;
        game.deg.current = 25;

        // level
        game.level = modeSettings.levelStart || 1;
        game.levelCap = 100;

        // speed
        game.perSecLower = 20;
        game.perSecHigher = 80;

        // delay mode settings
        //game.delayMode.delay = 2;
        game.delayMode.delay = 1 - 0.9 * (game.level / game.levelCap); 

        // first target
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;

        // set speed
        var levPer = game.level / game.levelCap;
        game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * levPer);

        // reduce delay time with level
        game.delayMode.delay = 1 - 0.9 * levPer;

    },
    onLate: function(modeAPI, game){
        game.lateTrack.count = 1;
        game.gameOver = true;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.getTargetRandom(game);
            game.level += 1;
            game.level = game.level > game.levelCap ? game.levelCap : game.level;
        }else{
            game.gameOver = true;
        }
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'black'], [1,'red']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        //draw.baseCircle_pixmap(ctx, sm, 'default', 'circle_big', 0);
        draw.baseCircle(ctx, sm.canvas, 'black');
        draw.targetRange(ctx, sm.canvas, sm.game);
        draw.current_pos_pixmap(ctx, sm, 'default', 'circle_small', 32, 0);
        draw.score(ctx, canvas, sm);
        // debug info
        if(sm.debugMode){
            ctx.fillStyle = 'white';
            ctx.font = '10px arial';
            ctx.textAlign = 'left';
            ctx.textbaseline = 'top';
            ctx.fillText('level: ' + sm.game.level, 10, 10);
        }
    }
});
