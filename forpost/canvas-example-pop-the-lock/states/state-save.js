(function () {
    // SAVE STATE
    // this state is used to set what the default slot index should be
    // and to also manage these save slots. utils.load actions are typicaly also
    // prefromed in main.js, and utils.save actions are preformed in 
    // in things like a game over state.

    var SLOT_INFO = [
        ['Empty'],
        ['Empty'],
        ['Empty'],
        ['Empty']
    ];

    var delete_mode = false,
    delete_colors = ['lime', 'blue', 'red', 'yellow', 'white'],
    delete_secs = 0,
    delete_colorIndex = 0;

    var loadSlotInfo = function(sm){
        var slotIndex = 0;
        while(slotIndex < 4){
            var save = utils.load(sm.appName, slotIndex);
            SLOT_INFO[slotIndex] = ['Empty'];
            if(save){
                Object.keys(save).forEach(function(key, itemIndex){
                    SLOT_INFO[slotIndex][itemIndex] = key + ' : ' + save[key];
                });
            }
            slotIndex += 1;
        }
    };

    // update slot button backgrounds helper
    var setSlotButtonBackgrounds = function(sm, styleActive, styleInactive){
        var slotIndex = 0;
        while(slotIndex < 4){
            var current = stateMachine.getButtonByAction(sm.buttons, 'set_slotindex_' + slotIndex);
            current.data.fill = styleInactive || 'red';
            if(slotIndex === sm.saveSlotIndex){
                current.data.fill = styleActive || 'yellow';
            }
            slotIndex += 1;
        }
    };

    stateMachine.load({
        key: 'save',
        init: function (sm) {
            // BUTTONS
            // title button
            var x = sm.canvas.width * 0.55,
            y = sm.canvas.height * 0.8;
            stateMachine.spawnButton(sm, {x: x, y: y}, 'start_state_title', 'Title');
            // delete mode
            var x = sm.canvas.width * 0.05,
            y = sm.canvas.height * 0.8;
            stateMachine.spawnButton(sm, {x: x, y: y}, 'toggle_delete', 'Delete');
            // slot buttons
            var slotIndex = 0;
            y = sm.canvas.height * 0.15;
            while(slotIndex < 4){
                var x = sm.canvas.width * (0.05 + (0.75 * (slotIndex / 3)));
                stateMachine.spawnButton(sm, 
                    {x: x, y: y, w: 96, h: 96}, 
                    'set_slotindex_' + slotIndex, 'Slot ' + slotIndex);
                slotIndex += 1;
            }
            // update slot button backgrounds for first time
            setSlotButtonBackgrounds(sm);
            // load slot info for first time
            loadSlotInfo(sm);
        },
        trans: function (sm, secs) {
            poolMod.update(sm.buttons, secs, sm);
        },
        update: function (sm, secs) {
            if(delete_mode){
                delete_secs += secs;
                if(delete_secs >= 0.1){
                    setSlotButtonBackgrounds(sm, delete_colors[delete_colorIndex], delete_colors[delete_colorIndex]);
                    delete_colorIndex += 1;
                    delete_colorIndex = utils.mod(delete_colorIndex, delete_colors.length);
                    delete_secs = 0;
                }
            }
        },
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
            draw.buttonPool(ctx, sm.buttons);
            var y = sm.canvas.height * 0.4;
            SLOT_INFO.forEach(function(infoArray, slotIndex){
                var x = sm.canvas.width * (0.05 + (0.75 * (slotIndex / 3)));
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';
                ctx.textAlign = '10px arial';
                infoArray.forEach(function(info, infoIndex){
                    ctx.fillText(info, x, y + infoIndex * 12);
                });
            });
        },
        click: function (sm, pos, e) {
            var button = poolMod.getObjectAt(sm.buttons, pos.x, pos.y);
            var parts = button.data.action.split('_');
            if (button) {
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
                if(button.data.action === 'toggle_delete'){
                    delete_mode = !delete_mode;
                    setSlotButtonBackgrounds(sm);
                    loadSlotInfo(sm);
                }
                if(parts[0] === 'set'){
                    if(parts[1] === 'slotindex'){
                        if(delete_mode){
                            utils.del(sm.appName, Number(parts[2]));
                            delete_mode = false;
                        }else{
                            sm.saveSlotIndex = Number(parts[2]);
                        }
                        var highScores = utils.load(sm.appName, sm.saveSlotIndex);
                        if(highScores){
                            sm.highScores = highScores;
                        }else{
                            sm.highScores = {};
                        }
                        // update backgrounds and slot info
                        setSlotButtonBackgrounds(sm);
                        loadSlotInfo(sm);
                    }
                }
            }
        }
    });
}());
