(function () {

    var LEVELS = [
        {
            x: 264,
            y: 225,
            gameOptions: {
                waveCount: 3,
                baseUnitCount: 5
            }
        },
        {
            x: 370,
            y: 180,
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
            spawn: function (obj, pool, sm, levelObj) {
                obj.data = levelObj;
                obj.x = levelObj.x === undefined ? 0 : levelObj.x;
                obj.y = levelObj.y === undefined ? 0 : levelObj.y;
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
        poolMod.spawn(data.levelButtons, sm, levelObj);
    };

    var spawnLevels = function(sm, data){
        LEVELS.forEach(function(levelObj){
            spawnLevelButton(sm, data, levelObj);
        });
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
            //spawnLevelButton(sm, data, LEVELS[0]);
            spawnLevels(sm, data);

        },
        trans: function (sm, state, data, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {},
        draw: function (sm, state, data, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            draw.pool(ctx, data.levelButtons, 'levelButton');
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
