
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod.create({
    distance: 0
});

console.log(game);
console.log(game.target.ETA);

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.textETA(ctx, game, 10, 10);
};

loop();
