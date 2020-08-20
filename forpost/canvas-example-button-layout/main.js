var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = {
    ver: '0.0.0',
    count: 0
};

// create button layout
var blObj = u.mkButtonLayout({
        attachTo: canvas,
        buttons: [{
                x: 16,
                y: 100,
                w: 64,
                h: 32,
                label: 'Step 0',
                onAction: function (pos, opt, button, e) {
                    state.count += 1;
                    button.label = 'Step ' + state.count;
                }
            }
        ]
    });

var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.buttonLayout(ctx, blObj);
    draw.ver(ctx, canvas, state);
};
loop();
