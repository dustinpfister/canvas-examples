var canvas = document.getElementById('the-canvas');
canvas.width = 320;
canvas.height = 240;

var state = game.create({
        canvas: canvas
    });

draw.background(state);
draw.board(state);
