var solar;

var state = {

    current: 'init',

    init: function () {
        solar = solarMod.create();
        state.current = 'world';
        console.log(solar);
    },

    world: function () {}

};

state[state.current]();
draw.back(solar);
draw.world(solar);
