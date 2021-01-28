// create a canvas
/*
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
*/

var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// Create new Game
var bird = game.newBird();

// INPUT
canvas.addEventListener('click', function () {
    game.flap(bird);
});

// Main APP Loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(canvas, ctx);
    draw.berries(bird, ctx);
    draw.bird(bird, ctx);
    draw.info(bird, ctx);
    draw.ver(bird, canvas, ctx);
    game.update(bird, canvas);
};

loop();
