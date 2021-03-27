(function () {
    // SAVE STATE
    stateMachine.load({
        key: 'save',
        init: function (sm) {
            // Buttons
            var x = sm.canvas.width / 2 - 128,
            y = sm.canvas.height * 0.3;
 
            stateMachine.spawnButton(sm, {x: x, y: y}, 'start_state_title', 'Title');
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
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
