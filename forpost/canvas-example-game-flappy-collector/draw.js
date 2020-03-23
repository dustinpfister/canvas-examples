// DRAW
var draw = {};

// draw the background
draw.background = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw the bird
draw.bird = function (bird, ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
};

// draw info
draw.info = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('points: ' + bird.points, 10, 10);
    ctx.fillText('bird pos: ( ' + Math.floor(bird.x) + ',' + Math.floor(bird.y) + ')', 10, 20);
};

// draw berries
draw.berries = function (bird, ctx) {
    ctx.fillStyle = 'red';
    bird.berries.forEach(function (berry) {
        ctx.fillRect(berry.x, berry.y, berry.size, berry.size);
    });
};
