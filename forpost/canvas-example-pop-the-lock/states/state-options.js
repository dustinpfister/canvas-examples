(function () {
    // OPTIONS STATE
    stateMachine.load({
        key: 'options',
        init: function (sm) {
            // Buttons
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.03;
            // back to title button
            stateMachine.spawnButton(sm, {x: x, y: y, w : 64}, 'start_state_title', 'Title');

            x = sm.canvas.width * 0.05;
            y = sm.canvas.height * 0.2;
            stateMachine.spawnButton(sm, {x: x, y: y, w : 256}, 'toggle_smprop_debugMode', 'Debug Mode: ' + sm.debugMode);

            // setup a background
            sm.background = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'#cc0000'],[0.25,'orange'],[1,'yellow']]);
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            //poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            //draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
            }
        }
    });
}());
