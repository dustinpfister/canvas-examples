gameMod.loadMode({
    key: 'classic',
    settings: [
        {
            key: 'level',
            disp: 'Level',
            start: 8,
            range: [1, 100]
        },
        {
            key: 'perSecLower',
            disp: 'Start Speed',
            start: 15,
            range: [10, 25]
        },
        {
            key: 'perSecHigher',
            disp: 'End Speed',
            start: 35,
            range: [30, 80]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.hp.active = false;

        game.deg.current = 25;
        game.tripUp.chance = 0.1;
        game.tripUp.degRange = [20, 30];

        game.perSecLower = modeSettings.perSecLower || 20;
        game.perSecHigher = modeSettings.perSecHigher ||70;
        game.deg.perSec = game.perSecLower;

        modeSettings.level = game.level = modeSettings.level || 1;
        game.targets = game.level;
        game.deg.target = modeAPI.getTargetRandom(game);
    },
    update: function(modeAPI, game){
        var hits = game.clickTrack.hits;
        game.score = hits;
        game.deg.perSec = game.perSecLower + Math.round( (game.perSecHigher - game.perSecLower) * (hits / game.level));
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
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'purple'],[1,'cyan']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        //draw.baseCircle_pixmap(ctx, sm, 'default', 'circle_big', 0);
        draw.baseCircle(ctx, sm.canvas, 'black');
        draw.targetRange(ctx, sm.canvas, sm.game);
        draw.current_pos_pixmap(ctx, sm, 'default', 'circle_small', 32, 0);
        draw.score(ctx, canvas, sm);
    }
});