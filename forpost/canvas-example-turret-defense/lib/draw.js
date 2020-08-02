var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw the turret
draw.turret = function (turret, ctx, canvas) {
    ctx.save();
    ctx.translate(turret.cx, turret.cy);
    ctx.rotate(turret.heading);
    ctx.fillStyle = 'green';
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();
    ctx.restore();
};

draw.turretShots = function (turret, ctx, canvas) {
    ctx.fillStyle = 'blue';
    turret.shots.forEach(function (shot) {
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
};

draw.turretInfo = function (turret, ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('heading: ' + turret.heading.toFixed(2), 5, 5);
    ctx.fillText('shotTime: ' + turret.shotTime.toFixed(2), 5, 15);
    ctx.fillText('active shots: ' + turret.shots.length, 5, 25);
    ctx.fillText('active enemies: ' + turret.enemies.length, 5, 35);
    ctx.fillText('turret RPS: ' + turret.rps, 5, 45);
};

draw.enemies = function (game, ctx, canvas) {
    ctx.fillStyle = 'red';
    game.enemies.forEach(function (enemy) {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    });
};
