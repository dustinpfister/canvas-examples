var draw = {};

// draw background
draw.back = function (ctx, canvas) {
    // draw background
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);
};

// draw bomber
draw.bomber = function (ctx, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);
};
// draw bombs
draw.bombs = function (ctx, state) {
    var i = state.bombs.length,
    bomb;
    ctx.fillStyle = 'red';
    while (i--) {
        bomb = state.bombs[i];
        ctx.fillRect(bomb.x, bomb.y, 32, 32);
    }
};

// draw player
draw.player = function (ctx, state) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(state.player.x, kaboom.PLAYER.y, kaboom.PLAYER.w, kaboom.PLAYER.h);
};

// draw score
draw.score = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(state.score, 320, 20);
};

draw.ui = function (ctx, state) {
    var button = kaboom.BUTTON_PAUSE;
    ctx.fillStyle = 'white';
    ctx.fillRect(button.x, button.y, button.w, button.h);
    if (state.gameOver) {
        button = kaboom.BUTTON_NEW_GAME;
        ctx.fillStyle = 'white';
        ctx.fillRect(button.x, button.y, button.w, button.h);
    }
};

// draw pause overlay
draw.pauseOverlay = function (ctx, canvas, state) {
    if (state.pauseTime > 0 || state.pauseTime === -1) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText(state.pauseMessage, canvas.width / 2, 200);
    }
};

// draw debug info
draw.debug = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('level: ' + state.level, 10, 10);
    ctx.fillText('bombCount: ' + state.bombCount, 10, 20);
    ctx.fillText('bomber: { x: ' + state.bomber.x +
        ', dir: ' + state.bomber.dir +
        ', pps: ' + state.bomber.pps + ' }', 10, 30);
    ctx.fillText('player: { x: ' + state.player.x +
        ', hp: ' + state.player.hp +
        ', dir: ' + state.player.dir +
        ', inputAI: ' + state.player.inputAI +
        ', pps: ' + state.player.pps + ' }', 10, 40);
};

draw.ver = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.textAlign = 'left';
    ctx.fillText('v' + state.ver, 5, canvas.height - 10);
};