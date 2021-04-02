(function () {
    // GAME STATE
    stateMachine.load({
        key: 'game',
        init: function (sm) {
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');

            // create a new game
            sm.game = gameMod.create({
              sm: sm
            });

        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);


    draw.waveButtons(sm.ctx, sm.game.waveButtons.pool);

            draw.buttonPool(ctx, sm.buttons);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if(button.data.action === 'start_state_title'){
                stateMachine.startStateChangeTrans(sm, 'title');
            }

    // wave buttons
    waveMod.onClick(sm, pos);

    // unit
    var unit = poolMod.getObjectAt(sm.game.unitPool, pos.x, pos.y);
    if (unit) {
        unit.lifespan = 0;
    }

    // reset button
    //var bx = sm.resetButton;
    //if (utils.boundingBox(pos.x, pos.y, 1, 1, bx.x, bx.y, bx.w, bx.h)) {
    //    sm.game = gameMod.create();
    //}


        }
    });
}());
