var game = (function () {

    var BOARD = {
        xOffset: 16,
        yOffset: 16,
        width: 128,
        height: 192,
        borderPer: 0.2
    };
    BOARD.borderY = Math.floor(BOARD.height - BOARD.height * BOARD.borderPer);

    return {
        BOARD: BOARD,
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
