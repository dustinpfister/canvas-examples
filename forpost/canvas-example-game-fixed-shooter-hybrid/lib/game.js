var game = (function () {

    var BOARD = {
        width: 128,
        height: 128,
        borderPer: 0.2
    };
    BOARD.borderY = Math.floor(BORAD.height - BORAD.height * BORD.borderPer);

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
