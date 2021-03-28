gameMod.loadMode({
    key: 'endurance',
    settings:[
        {
            key: 'levelStart',
            disp: 'Start Level',
            start: 10,
            range: [1, 100]
        },
        {
            key: 'perSecLower',
            disp: 'Start Speed',
            start: 30,
            range: [10, 40]
        },
        {
            key: 'dmgBase',
            disp: 'Damage Base',
            start: 10,
            range: [1, 40]
        },
        {
            key: 'maxHp',
            disp: 'Max HP',
            start: 100,
            range: [0, 100]
        }
    ],
    init: function(modeAPI, game, modeSettings){
        game.deg.current = 25;

        // hp settings
        game.hp.active = true;
        game.hp.max = 10 + Math.round( 990 * ( modeSettings.maxHp / 100));
        game.hp.current = game.hp.max;
        game.hp.perSec = 10;
        game.hp.damage = 1;
        //game.hp.perLevel = 1;
        game.hp.damageBase = 1.025 + 0.075 * (modeSettings.dmgBase / 40);

        // game level
        game.level = modeSettings.levelStart || 1;

        // speed
        game.perSecLower = modeSettings.perSecLower || 20;
        game.perSecHigher = 80;
        game.deg.perSec = game.perSecLower;
        game.deg.target = modeAPI.getTargetRandom(game);

        // delay mode settings
        game.delayMode.delay = 1;

        // margin
        game.deg.margin = 5;

        // trip up settings
        game.tripUp.count = 0;
        game.tripUp.chance = 0;
        game.tripUp.degRange = [25, 40];
        game.tripUp.countRange = [3, 6];

    },
    update: function(modeAPI, game, secs){
        var hits = game.clickTrack.hits;
        var per = game.level / 100;
        per = per > 1 ? 1 : per;
        if(!game.pause){
            game.hp.perSec = 10 - 9.5 * per;
            // heal
            game.hp.current += game.hp.perSec * secs;
            game.hp.current = game.hp.current >= game.hp.max ? game.hp.max : game.hp.current;
        }
        // margin goes up with level
        game.deg.margin = 6 - 3.5 * per;
        // trip up chance goes up with level
        game.tripUp.chance = per > 0.25 ? ( per - 0.25 ) / 0.75 * 0.75: 0;
        // damage should go up with level
        //game.hp.damage = 1 + game.hp.perLevel * (game.level - 1);
        game.hp.damage = 1 + Math.pow(game.hp.damageBase, game.level - 1) - 1;
        // set speed based on current level up to a cap
        game.deg.perSec = game.perSecLower + Math.floor( (game.perSecHigher - game.perSecLower) * (game.level / 100));
        game.deg.perSec = game.deg.perSec > game.perSecHigher ? game.perSecHigher: game.deg.perSec;
        // the game if over when the player is out of HP
        if(game.hp.current <= 0){
            game.gameOver = true;
        }
        // score
        game.score = Math.floor(hits + Math.pow(1.075, hits)) - 1;
    },
    onMiss: function(modeAPI, game){
        game.missTrack.count += 1;
        game.hp.current -= game.hp.damage;
    },
    onClick: function(modeAPI, game, modeSettings){
        if (game.inRange) {
            game.deg.target = modeAPI.newTarget(game);
            game.level += 1;
        }else{
            game.hp.current -= game.hp.damage;
        }
    },
    // Draw
    createBackground: function(sm, mode){
        var gradient = draw.createGradient(sm.ctx, sm.canvas, 0.625, [[0,'black'],[1,'lime']]);
        return gradient;
    },
    draw: function(ctx, canvas, sm){
        //draw.baseCircle_pixmap(ctx, sm, 'default', 'circle_big', 0);
        draw.baseCircle(ctx, sm.canvas, 'black');
        draw.targetRange(ctx, sm.canvas, sm.game);
        draw.current_pos_pixmap(ctx, sm, 'default', 'circle_small', 32, 0);
        draw.hpBar(ctx, canvas, sm.game);
        draw.score(ctx, canvas, sm);
        // debug info
        if(sm.debugMode){
            ctx.fillStyle = 'white';
            ctx.font = '10px arial';
            ctx.textAlign = 'left';
            ctx.textbaseline = 'top';
            ctx.fillText('level: ' + sm.game.level, 10, 10);
            ctx.fillText('deg per sec: ' + sm.game.deg.perSec, 10, 25);
            ctx.fillText('damage: ' + sm.game.hp.damage, 10, 40);
            ctx.fillText('hp: ' + Math.ceil(sm.game.hp.current) + ' / ' + sm.game.hp.max, 10, 55);
        }
    }
});
