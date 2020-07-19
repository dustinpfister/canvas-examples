var canvas = document.getElementById('the-canvas');
canvas.width = 320;
canvas.height = 240;

var state = game.create({
        canvas: canvas
    });

var lt = new Date();
var loop = function () {

    var now = new Date(),
    t = now - lt,
    secs = t / 1000;

    requestAnimationFrame(loop);
    game.update(state, secs);
    draw.background(state);
    draw.board(state);
    draw.player(state);
    lt = now;
};
loop();
