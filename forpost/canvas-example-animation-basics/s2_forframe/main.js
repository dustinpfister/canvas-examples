var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var opt = {
    ver: '0.0.0',
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
var forFrame = FF(opt),
api,
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

    api = forFrame(Math.floor(frame), maxFrame);
    draw.back(ctx, canvas)
    draw.bx(ctx, api.ani.bx);
    draw.info(ctx, api.ani);
    frame += FPS * secs;
    frame %= maxFrame;
    lt = now;

};
loop();
