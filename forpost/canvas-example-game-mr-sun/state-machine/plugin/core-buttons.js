stateMod.load({
    name: 'core-buttons',
    type: 'plugin',
    create: function (sm) {
        console.log(sm.states)
        console.log('create');
    },
    pointerEvent: function(sm, type, pos, e, state, game) {
        //console.log('pointer: ' + type);
        if(state.buttons){

            if(type === 'end'){
               
                var keys = Object.keys(state.buttons),
                button,
                i = keys.length;
                while(i--){
                    button = state.buttons[keys[i]];
                    if(utils.distance(button.x, button.y, pos.x, pos.y) <= button.r){
                        button.click(sm, pos, button, e, state, game);
                    }
                }

            }

        }
    }
});
