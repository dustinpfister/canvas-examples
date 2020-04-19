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
                    if (d <= 3) {
                        per = (3 - d) / 3;
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
            // fertup events
            var i = 6;
            while (i--) {
                var x = Math.floor(state.width * Math.random()),
                y = Math.floor(state.height * Math.random());
                events.fertup.init(state, x, y);
            }
            // cap fert
            state.cells.forEach(function (cell) {
                if (cell.land.fert > 10) {
                    cell.land.fert = 10;
                }
            });
        }
    },

    // what to do for each tick
    tick: {
        before: function (state, events, years) {

            console.log('before');

        },
        forCell: function (state, events, years, cell) {
            if (cell.land.fert > 5) {
                cell.land.fert -= 1;
            }
        },
        after: function (state) {

            console.log('done');

        }
    }

});
