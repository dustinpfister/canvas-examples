world.load({

    key: 'land_base',

    // events to add
    events: {
        // name of event
        inpact: {
            // what to do right away for the event when it starts
            init: function (world, x, y) {},
            // what to do for each year tick
            // if this is an over time event
            tick: function () {}
        }
    },

    // what do do when
    init: {
        before: function (world) {},
        forCell: function (cell, world) {},
        after: function (world) {}
    },

    // what to do for each tick
    forTick: {
        before: function (world) {},
        forCell: function (cell, world) {},
        after: function (world) {}
    }

});
