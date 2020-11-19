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

               console.log('checking for buttons');
            }

        }
    }
});
