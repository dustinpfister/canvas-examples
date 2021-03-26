
(function () {
    // GAME STATE
    stateMachine.load({
        key: 'game',
        init: function (sm) {
            // Quit Button
            stateMachine.spawnButton(sm, {x: sm.canvas.width - 72, y: 8, w: 64, h: 64}, 'set_state_gameover', 'Quit', Math.PI);
            // PTL area display Object
            var disp = stateMachine.spawnButton(sm, {x: 0, y: 0, w: sm.canvas.width, h: sm.canvas.height}, 
                'dispobj_ptl', sm.gameMode, Math.PI * 1.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                gameMod.modes[sm.gameMode].draw(ctx, sm.canvas, sm);
                ctx.restore();
            };
            // create a new game object
            sm.game = gameMod.create({
               mode: sm.gameMode,
               modeSettings: sm.modeSettings
            });
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            if(sm.game.gameOver){
                stateMachine.startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'set_state_gameover'){
                    stateMachine.startStateChangeTrans(sm, 'gameOver');
                }
            } else {
                gameMod.click(sm.game, sm.modeSettings);
            }
        }
    });
}());
