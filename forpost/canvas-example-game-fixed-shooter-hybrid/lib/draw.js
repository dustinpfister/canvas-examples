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
            // draw base board
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(0, 0, BOARD.width, BOARD.height);
            ctx.stroke();
            // draw player area
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.rect(0, BOARD.playY, BOARD.width, BOARD.playHeight);
            ctx.stroke();
        },

        // draw the player display object
        player: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            pl = state.player;

            ctx.fillStyle = 'blue';
            ctx.fillRect(pl.x, pl.y, pl.w, pl.h);

        }
    };

}
    ());
