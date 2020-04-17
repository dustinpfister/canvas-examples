
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var input = controlMod(canvas);

var loop = function () {

    requestAnimationFrame(loop);

    draw.back(ctx, canvas);
    draw.debugInput(ctx, input);

};

loop();
