var draw = (function () {

    return {
        background: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        board: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            BOARD = game.BOARD;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.rect(BOARD.xOffset, BOARD.yOffset, BOARD.width, BOARD.height);
            ctx.stroke();
        }
    };

}
    ());
