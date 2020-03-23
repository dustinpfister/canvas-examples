var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

var game = td.createGameObject();

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    td.update(game);

    draw.background(ctx, canvas);
    draw.turret(game, ctx, canvas);
    draw.enemies(game, ctx, canvas);
    draw.turretInfo(game, ctx, canvas);
    draw.turretShots(game, ctx, canvas);
};
loop();

// focus and blur
canvas.tabIndex = 0;
canvas.addEventListener('focus', function () {
    game.paused = false;
});
canvas.addEventListener('blur', function () {
    game.paused = true;
});
canvas.focus();
canvas.blur();
