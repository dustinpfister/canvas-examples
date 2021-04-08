(function () {
    // GAME OVER STATE
    stateMachine.load({
        key: 'gameOver',
        init: function (sm, state, data, initObj) {
            var x = sm.canvas.width * 0.5 - 128,
            y = sm.canvas.height * 0.3;
            stateMachine.spawnButton(sm, {x: x, y: y}, 'start_state_worldmap', 'World Map');
        },
        trans: function (sm, state, data, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {},
        draw: function (sm, state, data, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.units(sm.ctx, sm.game.unitPool);
            draw.units(sm.ctx, sm.game.playerUnitPool);
            draw.buttonPool(ctx, sm.buttons);
            // debug info
            var sx = 40,
            sy = 32;
            if(sm.debugMode){
                ctx.fillStyle = 'white';
                ctx.font = '10px arial';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.fillText('gameOver?: ' + sm.game.gameOver, sx, sy);
                ctx.fillText('Win?: ' + sm.game.win, sx, sy + 10);
            }
        },
        click: function (sm, state, data, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if(button){
                if(button.data.action === 'start_state_worldmap'){
                    stateMachine.startStateChangeTrans(sm, 'worldmap');
                }
            }
        }
    });
}());
