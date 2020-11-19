stateMod.load({
    name: 'core-pointer',
    type: 'plugin',
    pointerEvent : function(sm, type, pos, e, state, game){
        if(state.pointer){
            var method = state.pointer[type];
            if(method){
                method.call(sm, sm, pos, e, state, game);
            }
        }
    },
    update: function(sm){
        // console.log('tick');
    }
});