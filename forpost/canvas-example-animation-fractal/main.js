var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var opt = {
    ver: '0.1.0',
    maxFrame: 400,
    forFrame: function (api, f, mf) {
        var bxArr = api.ani.bxArr = [];
        var i = 0,
        per,
        bxCount = 15,
        maxSize = canvas.width * 1.75;
        while (i < bxCount) {
            // figure out the percent for the current box
            per = api.per + 1 / bxCount * i;
            per %= 1;
            // create and push the box
            bx = {};
            bx.w = maxSize * per;
            bx.h = maxSize * per;
            //bx.x = canvas.width / 2 - (bx.w / 2);
            bx.x = canvas.width * 0.25 + (canvas.width * 0.5 * api.bias - (bx.w / 2));
            bx.y = canvas.height / 2 - (bx.h / 2);
            bx.radian = Math.PI / 180 * (-180 + 360 * api.bias) * per;
            bx.per = bx.w / maxSize;
            bxArr.push(bx);
            i += 1;
        }
        bxArr.sort(function (a, b) {
            if (a.per > b.per) {
                return 1;
            }
            return -1;
        });
    }
};

// create an animation method
var ani = FF(opt);

var frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    var state = ani(frame, opt.maxFrame);
    draw.back(ctx, canvas);
    draw.bxArr(ctx, state);
    draw.ver(ctx, canvas, state);
    frame += 1;
    frame %= opt.maxFrame;
};

loop();
