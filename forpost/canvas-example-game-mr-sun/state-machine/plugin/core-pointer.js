stateMod.load({
    name: 'core-pointer',
    type: 'plugin',
    create: function(sm){
        sm.log('create core-pointer ');
    },
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