// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

draw.back(ctx, canvas);

var img = imgLoad({
        baseURL: './img/',
        fileCount: 1
    });

/*
var loop = function () {
requestAnimationFrame(loop);
draw.back(ctx, canvas);

};

loop();
*/
