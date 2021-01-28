var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// Create new Game
var bird = game.newBird();

// INPUT
canvas.addEventListener('click', function (e) {
    var pos = utils.getCanvasRelative(e);
    console.log(pos.x, pos.y);
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
