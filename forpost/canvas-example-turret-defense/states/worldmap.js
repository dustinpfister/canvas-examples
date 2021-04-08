(function () {

    // level Buttons
    var createLevelButtonPool = function(count){
        return poolMod.create({
            count: count || 10,
            maxSecs: 0.25,
            spawn: function (obj, pool, sm, opt) {
                obj.data = opt;
                obj.x = 8;
                obj.y = 8;
                obj.w = 32;
                obj.h = 32;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                obj.lifespan = Infinity;
            }
        });
    };

    // load WORLD MAP STATE into stateMachine
    stateMachine.load({
        key: 'worldmap',

        data: {
            levelButtons: createLevelButtonPool()
        },

        init: function (sm) {
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');

            poolMod.spawn(this.data.levelButtons);

        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, this.data.levelButtons, 'basic');
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
