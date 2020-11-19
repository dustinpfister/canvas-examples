stateMod.load({
    name: 'core-buttons',
    type: 'plugin',
    create: function (sm) {
        // create button helper
        var createButton = function(opt){
           var button = {};
           opt = opt || {};
           button.x = opt.x === undefined ? 0 : opt.x;
           button.y = opt.y === undefined ? 0 : opt.y;
           button.r = opt.r === undefined ? 16 : opt.r;
           button.click = opt.click || function(){};
           return button;
        };
        // call all functions for buttons to create button objects that way
        Object.keys(sm.states).forEach(function(stateKey){
            var state = sm.states[stateKey];
            if(state.buttons){
                Object.keys(state.buttons).forEach(function(buttonKey){
                    var button = state.buttons[buttonKey];
                    if(typeof button === 'function'){
                        state.buttons[buttonKey] = button(sm, createButton)
                    }
                });
            }
        });
    },
    pointerEvent: function(sm, type, pos, e, state, game) {
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
