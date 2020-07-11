var game = (function () {

    var BOARD = {
        xOffset: 16,
        yOffset: 16,
        width: 128,
        height: 192,
        playPer: 0.3
    };
    BOARD.playY = Math.floor(BOARD.height - BOARD.height * BOARD.playPer);
    BOARD.playHeight = BOARD.height - BOARD.playY;

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
