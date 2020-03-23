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
    ctx.strokeStyle = 'white';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
    ctx.strokeRect(bird.x, bird.y, bird.size, bird.size);
};

// draw info
draw.info = function (bird, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText('points: ' + bird.points, 10, 10);
    ctx.fillText('berry level: ' + bird.berryLevel, 10, 20);
    ctx.fillText('berries collected: ' + bird.berriesCollected + '/' + bird.berriesNextLevel, 10, 30);
    ctx.fillText('berries delay: ' + bird.berriesDelay, 10, 40);
    if (bird.berries.length > 0) {
        berry = bird.berries[0];
        ctx.fillText('berry 0 worth: ' + berry.worth, 10, 50);
        ctx.fillText('berry 0 pps: ' + berry.pps, 10, 60);
    }
};

// draw berries
draw.berries = function (bird, ctx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    bird.berries.forEach(function (berry) {
        ctx.fillRect(berry.x, berry.y, berry.size, berry.size);
        ctx.strokeRect(berry.x, berry.y, berry.size, berry.size);
    });
};

// autoTime progress bar
draw.autoTimeProgressBar = function (bird, ctx, canvas) {
    var per = bird.autoTime / bird.autoDelay;
    if (bird.autoTime) {
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
    }
};
