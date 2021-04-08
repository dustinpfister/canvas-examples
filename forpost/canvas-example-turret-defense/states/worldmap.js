(function () {

    // load WORLD MAP STATE into stateMachine
    stateMachine.load({
        key: 'worldmap',
        init: function (sm) {
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');
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
            if(button){
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
            }
        }
    });

}());
