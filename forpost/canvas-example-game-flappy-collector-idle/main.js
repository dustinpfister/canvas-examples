// create a canvas
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
    draw.background(ctx);
    draw.berries(bird, ctx);
    draw.bird(bird, ctx);
    draw.info(bird, ctx);
    draw.autoTimeProgressBar(bird, ctx, canvas);
    draw.ver(bird, canvas, ctx);
    game.update(bird, canvas);
};

loop();
