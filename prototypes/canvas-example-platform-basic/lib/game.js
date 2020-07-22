var game = (function () {

    var gravity = function (state, obj, secs) {
        obj.y -= 10 * secs;
        obj.y >= state.world.height ? state.world.height : 0;
    };

    return {
        // draw background
        create: function () {

            return {
                world: {
                    width: 128,
                    height: 64
                },
                player: {
                    x: 0,
                    y: 0,
                    width: 32,
                    height: 64
                },
                update: function (state, secs) {
                    gravity(state, state.player, secs);
                }
            };

        }
    }
}
    ());
