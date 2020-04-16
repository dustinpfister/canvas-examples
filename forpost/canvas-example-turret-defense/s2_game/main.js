var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    td.update(game);

    draw.back(ctx, canvas);
};
loop();
