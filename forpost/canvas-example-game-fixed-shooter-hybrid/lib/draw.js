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
            b = state.board,
            pa = state.playArea;
            // board
            ctx.fillStyle = 'blue';
            ctx.fillRect(b.x, b.y, b.w, b.h);
            // play area
            ctx.fillStyle = 'green';
            ctx.fillRect(pa.x, pa.y, pa.w, pa.h);
        },

        // draw the player display object
        player: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx,
            pl = state.player;
            ctx.fillStyle = 'red';
            ctx.fillRect(pl.x, pl.y, pl.w, pl.h);

        },

        // player shots
        playerShots: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'white';
            state.player.shots.forEach(function (shot) {
                if (shot.active) {
                    ctx.fillRect(shot.x, shot.y, shot.w, shot.h);
                }
            });
        },

        enemies: function (state) {
            var canvas = state.canvas,
            ctx = state.ctx;
            ctx.fillStyle = 'white';
            state.enemies.pool.forEach(function (e) {
                if (e.active) {
                    ctx.fillRect(e.x, e.y, e.w, e.h);
                }
            });
        }
    };

}
    ());
