// DRAW
var draw = {};
draw.bx = function (ctx, bx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var opt = {
    forFrame: function (api, f, mf) {
        var bx = api.ani.bx = {
            w: 32,
            h: 32
        };
        bx.x = (canvas.width - 32) * api.per;
        bx.y = canvas.height / 2 - 16 + canvas.height / 4 * api.bias;
    }
};

// create an animation method
var ani = FF(opt),
frame = 0,
maxFrame = 50,
FPS = 24,
lt = new Date();

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000,
    bx;

    requestAnimationFrame(loop);

    bx = ani(Math.floor(frame), maxFrame).bx;
    draw.back(ctx, canvas)
    draw.bx(ctx, bx);
    frame += FPS * secs;
    frame %= maxFrame;
    lt = now;

};
loop();
