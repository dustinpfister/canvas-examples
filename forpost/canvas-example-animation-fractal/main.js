var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

var opt = {
    forFrame: function (api, f, mf) {
        var bxArr = api.ani.bxArr = [];
        var i = 0,
        per,
        bxCount = 10,
        maxSize = canvas.width;
        while (i < bxCount) {
            // figure out the percent for the current box
            per = api.per + 1 / bxCount * i;
            per %= 1;
            // create and push the box
            bx = {};
            bx.w = maxSize * per;
            bx.h = maxSize * per;
            bx.x = canvas.width / 2 - (bx.w / 2);
            bx.y = canvas.height / 2 - (bx.h / 2);
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
    draw.back(ctx, canvas)
    draw.bxArr(ctx, ani(frame, 200));

    frame += 1;
    frame %= 200;

};

loop();
