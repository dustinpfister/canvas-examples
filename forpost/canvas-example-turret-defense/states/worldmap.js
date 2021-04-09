(function () {

    var LEVELS = [
        {
            x: 264,
            y: 225,
            gameOptions: {
                waveCount: 7,
                baseUnitCount: 10
            }
        }
    ];

    // Create a level Buttons pool
    var createLevelButtonPool = function(count){
        return poolMod.create({
            count: count || 10,
            maxSecs: 0.25,
            spawn: function (obj, pool, sm, opt) {
                obj.data = opt;
                obj.x = opt.x === undefined ? 0 : opt.x;
                obj.y = opt.y === undefined ? 0 : opt.y;
                obj.w = 64;
                obj.h = 64;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                obj.lifespan = Infinity;
            }
        });
    };

    var spawnLevelButton = function(sm, data, levelObj){
        // just spawn one level button for now
        //var levelButtonOptions = {
        //     x: 264,
         //    y: 225,
         //    gameOptions: {
         //        waveCount: 3,
         //        baseUnitCount: 5
         //    }
        //};
        poolMod.spawn(data.levelButtons, sm, levelObj);
    };


    // load WORLD MAP STATE into stateMachine
    stateMachine.load({

        key: 'worldmap',

        data: {
            levelButtons: createLevelButtonPool(LEVELS.length)
        },

        init: function (sm, state, data, initObj) {

            // to title button
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');

            // just spawn one level button for now
            spawnLevelButton(sm, data, LEVELS[0]);

        },
        trans: function (sm, state, data, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {},
        draw: function (sm, state, data, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, this.data.levelButtons, 'basic');
        },
        click: function (sm, state, data, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            if(button){
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title', {});
                }
            }
            // check for a level button
            var lvButton = poolMod.getObjectAt(this.data.levelButtons, pos.x, pos.y);
            if(lvButton){
                //console.log(lvButton.data.gameOptions);
                stateMachine.startStateChangeTrans(sm, 'game', lvButton.data.gameOptions);
            }
        }
    });

}());
