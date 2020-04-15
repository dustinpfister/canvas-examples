world.load({

    key: 'land_base',

    // events to add
    events: {
        // name of event
        inpact: {
            // what to do right away for the event when it starts
            init: function (state, x, y) {},
            // what to do for each year tick
            // if this is an over time event
            tick: function () {}
        }
    },

    // what do do when
    init: {
        before: function (state) {},
        forCell: function (state, cell) {},
        after: function (state) {}
    },

    // what to do for each tick
    forTick: {
        before: function (state) {},
        forCell: function (state, cell) {},
        after: function (state) {}
    }

});
