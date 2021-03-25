(function () {
    // TITLE STATE
    stateMachine.load({
        key: 'title',
        init: function (sm) {
            // Buttons
            var x = sm.canvas.width / 2 - 128,
            y = sm.canvas.height * 0.3;
            stateMachine.spawnButton(sm, {x: x, y: y}, 'start_state_gameMode', 'Play');
            stateMachine.spawnButton(sm, {x: x, y: y + (32 + 10) * 2}, 'start_state_options', 'Options');
            stateMachine.spawnButton(sm, {x: x, y: y + (32 + 10) * 4}, 'goto_devsite_canvas_examples', 'More Games', Math.PI);
            // title display Object
            poolMod.spawn(sm.dispObjects, sm, {
                action: 'dispobj_title',
                disp: 'Pop The Lock',
                sx: sm.canvas.width * 1.7 * 1,
                sy: 8,
                w: 512,
                h: 128,
                dist: sm.canvas.width * 1.6,
                heading: Math.PI,
                draw: function(ctx, obj){
                    draw.text_title(ctx, sm.canvas, obj);
                }
            });
            // setup a background
            sm.background = draw.createGradient(sm.ctx, sm.canvas, 0.75, [[0,'#cc0000'],[0.25,'purple'],[1,'cyan']]);
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
            poolMod.update(sm.dispObjects, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, sm.dispObjects);
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if (button) {
                if(button.data.action === 'start_state_gameMode'){
                    stateMachine.startStateChangeTrans(sm, 'gameMode');
                }
                if(button.data.action === 'start_state_options'){
                    stateMachine.startStateChangeTrans(sm, 'options');
                }
                if(button.data.action === 'goto_devsite_canvas_examples'){
                    document.location.href = 'https://dustinpfister.github.io/2020/03/23/canvas-example/';
                }
            }
        }
    });
}());
