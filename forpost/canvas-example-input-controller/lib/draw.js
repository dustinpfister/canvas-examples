// Draw
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.debugInput = function (ctx, input) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('input.pointerDown: ' + input.pointerDown, 10, 10);
    var pos = input.pos.length >= 1 ? input.pos : [{
                x: null,
                y: null
            }
        ];
    ctx.fillText('input.pos: ' + pos[0].x + ',' + pos[0].x, 10, 20);
    ctx.fillText('input.keys[87] (w): ' + input.keys[87], 10, 40);
    ctx.fillText('input.keys[65] (a): ' + input.keys[65], 10, 50);
    ctx.fillText('input.keys[83] (s): ' + input.keys[83], 10, 60);
    ctx.fillText('input.keys[68] (d): ' + input.keys[68], 10, 70);
};
