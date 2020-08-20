var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = {
    ver: '0.0.0',
    i: 0
};

// create button layout
var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: [{
                x: canvas.width / 2 - 48,
                y: 180,
                w: 32,
                h: 32,
                label: 'i+',
                onAction: function (pos, opt, button, e) {
                    state.i += 1;
                }
            }, {
                x: canvas.height / 2 + 48,
                y: 180,
                w: 32,
                h: 32,
                label: 'i-',
                onAction: function (pos, opt, button, e) {
                    state.i -= 1;
                }
            }
        ]
    });

var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);
    draw.info(ctx, canvas, state);
    draw.ver(ctx, canvas, state);
};
loop();
