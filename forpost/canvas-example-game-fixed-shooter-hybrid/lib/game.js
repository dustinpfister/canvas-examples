var game = (function () {

    return {
        create: function (opt) {
            opt = opt || {};
            var state = {
                canvas: opt.canvas,
                ctx: opt.canvas.getContext('2d')
            };
            state.player = unit.createPlayer();
            return state;
        }
    };

}
    ());
