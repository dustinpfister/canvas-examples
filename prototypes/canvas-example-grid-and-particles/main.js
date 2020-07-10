// MAIN
var canvas = document.createElement('canvas'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;

var state = game.create({
        canvas: canvas
    });

var loop = function () {
    requestAnimationFrame(loop);
    //draw.background(state);
};

loop();
