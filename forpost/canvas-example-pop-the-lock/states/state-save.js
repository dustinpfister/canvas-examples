(function () {
    // SAVE STATE
    // this state is used to set what the default slot index should be
    // and to also manage these save slots. utils.load actions are typicaly also
    // prefromed in main.js, and utils.save actions are preformed in 
    // in things like a game over state.
    stateMachine.load({
        key: 'save',
        init: function (sm) {
            // Buttons
            var x = sm.canvas.width * 0.55,
            y = sm.canvas.height * 0.8;
            stateMachine.spawnButton(sm, {x: x, y: y}, 'start_state_title', 'Title');

            var slotIndex = 0;
            y = sm.canvas.height * 0.3;
            while(slotIndex < 4){
                var x = sm.canvas.width * (0.12 + (0.6 * (slotIndex / 3)));
                var button = stateMachine.spawnButton(sm, 
                    {x: x, y: y, w: 96, h: 128}, 
                    'set_slotindex_' + slotIndex, 'Slot ' + slotIndex);
                button.data.fill = 'red';
                if(slotIndex === sm.saveSlotIndex){
                    button.data.fill = 'yellow';
                }
                slotIndex += 1;
            }

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
            var parts = button.data.action.split('_');
            if (button) {
                if(button.data.action === 'start_state_title'){
                    stateMachine.startStateChangeTrans(sm, 'title');
                }
                if(parts[0] === 'set'){
                    if(parts[1] === 'slotindex'){
                        sm.saveSlotIndex = Number(parts[2]);
                        var highScores = utils.load(sm.appName, sm.saveSlotIndex);
                        if(highScores){
                            sm.highScores = highScores;
                        }
                    }
                }
            }
        }
    });
}());
