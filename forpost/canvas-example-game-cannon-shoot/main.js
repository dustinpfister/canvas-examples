// MAIN

var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var state = game.createNewState({
        ver: '0.0.1',
        canvas: canvas
    });

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    game.update(state);
    draw.background(state);
    draw.gridLines(state);
    draw.ground(state);
    draw.currentMode(state);
    draw.debug(state);
    draw.ver(state);
};
loop();
canvas.addEventListener('mousedown', game.userAction(state));
canvas.addEventListener('mousemove', game.userAction(state));
canvas.addEventListener('mouseup', game.userAction(state));
canvas.addEventListener('touchstart', game.userAction(state));
canvas.addEventListener('touchmove', game.userAction(state));
canvas.addEventListener('touchend', game.userAction(state));