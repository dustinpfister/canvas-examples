(function () {

    var LEVELS = [
        { // 1
            x: 264,
            y: 225,
            gameOptions: {
                waveCount: 3,
                baseUnitCount: 5,
                unitHPRange:[1, 1]
            }
        },
        { // 2
            x: 370,
            y: 180,
            gameOptions: {
                waveCount: 7,
                baseUnitCount: 10
            }
        },
        { // 3
            x: 170,
            y: 80,
            gameOptions: {
                waveCount: 15,
                baseUnitCount: 12
            }
        },
        { // 4
            x: 70,
            y: 380,
            gameOptions: {
                waveCount: 18,
                baseUnitCount: 13
            }
        },
        { // 5
            x: 430,
            y: 360,
            gameOptions: {
                waveCount: 99,
                baseUnitCount: 18
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
                // !!! an alpha value should be part of the top level of a pool object
                obj.data.alpha = 0.8;
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
            levelButtons: createLevelButtonPool(LEVELS.length),
            transEffect: {
                alpha: 0,
                obj:{x: 0, y: 0},
                fp: {}
            }
        },

        init: function (sm, state, data, initObj) {

            // to title button
            var x = sm.canvas.width * 0.87,
            y = sm.canvas.height * 0.045;
            stateMachine.spawnButton(sm, {x: x, y: y, w: 64}, 'start_state_title', 'Title');

            // spawn levels
            spawnLevels(sm, data);

        },
        trans: function (sm, state, data, secs, per) {
            if(data.transEffect){
                // use pool mod frame per to update trans effect of level butons
                var frame = Math.round(sm.trans.secs / sm.trans.secsTotal * 50);
                var fp = poolMod.createFramePerObj(frame, !sm.trans.inState);
                poolMod.moveByFramePerObj(data.transEffect.obj, fp);
                data.transEffect.alpha = fp.per;
            }
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, state, data, secs) {},
        draw: function (sm, state, data, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);

            draw.levelButtons(ctx, data.levelButtons, data.transEffect.alpha);
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
