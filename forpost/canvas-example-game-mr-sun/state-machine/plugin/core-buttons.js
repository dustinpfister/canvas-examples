stateMod.load({
    name: 'core-buttons',
    type: 'plugin',
    afterCreate: function (sm) {

        sm.log('create core-buttons ');

        // create button helper
        var createButton = function(opt){
           var button = {};
           opt = opt || {};
           button.x = opt.x === undefined ? 0 : opt.x;
           button.y = opt.y === undefined ? 0 : opt.y;
           button.r = opt.r === undefined ? 16 : opt.r;
           button.click = opt.click || function(){};
           button.sprite = sm.createSpriteObj('default', 0);
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
                    if(typeof button === 'object'){
                        state.buttons[buttonKey] = createButton(button);
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
