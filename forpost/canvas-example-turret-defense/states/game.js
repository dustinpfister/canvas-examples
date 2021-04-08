(function () {
    // GAME STATE
    stateMachine.load({
        key: 'game',
        init: function (sm, state, data, gameOptions) {
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');

            // create a new game
            sm.game = gameMod.create(gameOptions || {
                waveCount: 5,
                baseUnitCount: 10,
                sm: sm
            });

            // starting unit
            poolMod.spawn(sm.game.playerUnitPool, sm, {});

        },
        trans: function (sm, state, data, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {
            gameMod.update(sm, secs);
            if(sm.game.gameOver){
                stateMachine.startStateChangeTrans(sm, 'gameOver');
            }
        },
        draw: function (sm, state, data, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);

            draw.units(sm.ctx, sm.game.unitPool);
            draw.playerUnits(sm.ctx, sm.game.playerUnitPool);
            draw.pool(sm.ctx,  sm.game.playerShotsPool);

            draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);
            draw.buttonPool(ctx, sm.buttons);

            var waveButtonsPool = sm.game.waveButtons.pool,
            waveButtonData = waveButtonsPool.data,
            sx = 40,
            sy = 32;
            if(sm.debugMode){
                ctx.fillStyle = 'white';
                ctx.font = '10px arial';
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.fillText('currentWave: ' + waveButtonData.currentWave, sx, sy);
                ctx.fillText('waveCount: ' + waveButtonData.waveCount, sx, sy + 10);
                ctx.fillText('toSpawn: ' + waveButtonData.toSpawn, sx, sy + 20);
                ctx.fillText('ActiveWaveButtonCount: ' + waveButtonData.activeCount, sx, sy + 30);
                ctx.fillText('rushTo: ' + waveButtonData.rushTo, sx, sy + 40);
                ctx.fillText('Unit Count: ' + sm.game.unitQueue.unitCount, sx, sy + 50);
                ctx.fillText('Active Player Units: ' + sm.game.activeCount, sx, sy + 60);
            }

        },
        click: function (sm, state, data, pos, e) {
            // check buttons
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if(button){
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
            }
        },
        pointer: {
            start: function(sm, state, data, pos, e, state){
                gameMod.click(sm.game, pos, e, sm);
            },
            move: function(sm, state, data, pos, e, state){
                gameMod.onPointerMove(sm.game, pos, e, sm);
            },
            end: function(sm, state, data, pos, e, state){
            }
        }
    });
}());
