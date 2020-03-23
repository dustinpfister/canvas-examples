var draw = (function () {

    // draw Cell Lines
    var drawCellLines = function (ctx, opt) {
        opt = opt || {};
        var ci = 0,
        w = opt.w || 8,
        h = opt.h || 8,
        cellSize = opt.cellSize || 32,
        cLen = w * h;
        offset = opt.offset || {};
        offset.x = offset.x === undefined ? 0 : offset.x;
        offset.y = offset.y === undefined ? 0 : offset.y;
        ctx.strokeStyle = opt.style || 'lime';
        while (ci < cLen) {
            var x = ci % w,
            y = Math.floor(ci / w);
            ctx.strokeRect(
                x * cellSize + offset.x,
                y * cellSize + offset.y,
                cellSize, cellSize);
            ci += 1;
        }
    };

    var drawShot = function (state) {
        var ctx = state.ctx;
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        ctx.arc(state.shot.x, state.shot.y, 5, 0, Math.PI * 2);
        ctx.stroke();
    }

    var modes = {
        aim: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas,
            cannon = state.cannon;
            // crude cannon line
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(cannon.sx, cannon.sy);
            ctx.stroke();
            // fire button
            ctx.fillStyle = 'red';
            ctx.fillRect(canvas.width - 64, canvas.height - 64, 64, 64);
            ctx.fillStyle = 'black';
            ctx.font = '20px arial';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText('FIRE!', canvas.width - 32, canvas.height - 32);
        },
        fired: function (state) {
            drawShot(state);
        },
        over: function () {
            drawShot(state);
        }
    };

    return {

        // draw background
        background: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        // draw by way of the current mode
        currentMode: function (state) {
            modes[state.mode](state);
        },

        // draw grid lines
        gridLines: function (state) {
            var ctx = state.ctx;
            var xPer = state.offset.x % 32 / 32,
            yPer = state.offset.y % 32 / 32;
            drawCellLines(ctx, {
                w: 12,
                h: 10,
                style: 'grey',
                offset: {
                    x: -32 * xPer - 32,
                    y: -32 * yPer - 32
                }
            });
        },

        // draw debug info
        debug: function (state) {
            var ctx = state.ctx;
            ctx.fillStyle = 'white';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('mode: ' + state.mode, 10, 10);
            ctx.fillText('map offset:  ' + Math.floor(state.offset.x) + ',' +
                Math.floor(state.offset.y), 10, 20);
            ctx.fillText('cannon power: ' + state.cannon.power, 10, 30);
        },

        // draw ground
        ground: function (state) {
            var canvas = state.canvas,
            yAjust = 0;
            if (state.offset.y > -5) {
                ctx.fillStyle = 'green';
                yAjust = state.offset.y > 0 ? state.offset.y / canvas.height : 0;
                ctx.fillRect(0, canvas.height - 5 - (canvas.height / 2) * yAjust, canvas.width, 150);
            }
        }

    }

}
    ());
