(function () {
    // TITLE STATE
    stateMachine.load({
        key: 'title',
        init: function (sm, state, data) {
            var x = sm.canvas.width * 0.5,
            y = sm.canvas.height * 0.5;

            stateMachine.spawnButton(sm, {x: x - 128, y: y}, 'start_state_worldmap', 'Play');

            y = sm.canvas.height * 0.1;
            stateMachine.spawnButton(sm, {x: x - 256, y: y, w: 512, h: 128}, 'title', 'Turret Defense');

        },
        trans: function (sm, state, data, secs) {

            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {

        },
        draw: function (sm, state, data, ctx, canvas) {

            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
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
