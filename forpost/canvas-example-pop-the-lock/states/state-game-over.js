(function () {
    // GAME OVER STATE
    stateMachine.load({
        key: 'gameOver',
        init: function (sm) {
            // option buttons
            var dispText = ['Try Again', 'Settings', 'Title'];
            ['game', 'gameMode', 'title'].forEach(function(stateKey, i){
            var bx = {x: sm.canvas.width - 176, y: sm.canvas.height * 0.25 + 70 * i, w: 168, h: 64};
                stateMachine.spawnButton(sm, bx, 'set_state_' + stateKey, dispText[i], 0);
            });
            // Game Over text area display Object
            var disp = stateMachine.spawnButton(sm, {x: 0, y: 0, w: sm.canvas.width, h: sm.canvas.height}, 
                'dispobj_gameOver', sm.gameMode, Math.PI * 0.5, 'dispObjects');
            disp.data.draw = function(ctx, obj){
                ctx.save();
                ctx.translate(obj.x, obj.y);
                draw.text_gameover(ctx, sm.canvas, sm);
                ctx.restore();
            };
            // update any save that might be there
            var highScore = sm.highScores[sm.game.mode];
            if(!highScore || highScore < sm.game.score){
                sm.highScores[sm.game.mode] = sm.game.score;
                utils.save(sm.appName, 0, sm.highScores);
            }
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {
        },
        draw: function (sm, ctx, canvas) {
            draw.backgroundMode(ctx, canvas, sm);
            draw.background(ctx, canvas, 'rgba(0,0,0,0.8)');
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                ['title', 'gameMode','game'].forEach(function(stateKey, i){
                    if(button.data.action === 'set_state_' + stateKey){
                        stateMachine.startStateChangeTrans(sm, stateKey);
                    }
                });
            }
        }
    });
}());
