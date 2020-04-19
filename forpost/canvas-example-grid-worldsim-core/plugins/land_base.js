world.load({

    key: 'land_base',

    // events to add
    events: {
        // name of event
        fertup: {
            // what to do right away for the event when it starts
            init: function (state, x, y) {
                var i = state.cells.length,
                d,
                per,
                cell;
                while (i--) {
                    cell = state.cells[i];
                    d = u.distance(cell.x, cell.y, x, y);
                    per = 0;
                    if (d <= 5) {
                        per = (5 - d) / 5;
                    }
                    cell.land.fert += Math.floor(10 * per);
                }
            }
        }
    },

    // what do do when
    init: {
        before: function (state, events) {
            console.log('land_base before hook');
        },
        forCell: function (state, events, cell) {
            console.log('land_base forCell hook');
            var land = cell.land = {};
            land.fert = 0;
        },
        after: function (state, events) {
            console.log('land_base after hook');
            console.log(events);

        }
    },

    // what to do for each tick
    forTick: {
        before: function (state) {},
        forCell: function (state, cell) {},
        after: function (state) {}
    }

});
