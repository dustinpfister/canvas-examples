// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
//canvas.style.width = '100%';
//canvas.style.height = '100%';
ctx.translate(0.5, 0.5);

var bl = Blade.create();

var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.blade(ctx, bl);

};

loop();
