// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = game.createNewState({
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
};
loop();
canvas.addEventListener('mousedown', game.userAction(state));
canvas.addEventListener('mousemove', game.userAction(state));
canvas.addEventListener('mouseup', game.userAction(state));
canvas.addEventListener('touchstart', game.userAction(state));
canvas.addEventListener('touchmove', game.userAction(state));
canvas.addEventListener('touchend', game.userAction(state));