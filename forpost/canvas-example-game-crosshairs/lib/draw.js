var draw = (function () {

    var drawCrossCircles = function (ctx, cross) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusOuter, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
        ctx.stroke();
    };

    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        // draw cross hairs
        cross: function (ctx, cross) {
            var ch = cross.crosshairs;
            drawCrossCircles(ctx, cross);
            ctx.strokeStyle = 'rgba(200,0,0,0.5)';
            ctx.beginPath();
            ctx.moveTo(ch.x, ch.y - ch.radius * 1.5);
            ctx.lineTo(ch.x, ch.y + ch.radius * 1.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ch.x - ch.radius * 1.5, ch.y);
            ctx.lineTo(ch.x + ch.radius * 1.5, ch.y);
            ctx.stroke();
        },
        // draw map
        map: function (ctx, map, cross) {
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 3;
            map.cells.forEach(function (cell) {
                var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
                y = cell.y * map.cellSize + cross.offset.y + (240 / 2),
                per = cell.HP / cell.maxHP,
                color = 'rgba(0,200,0,' + per.toFixed(2) + ')';
                ctx.beginPath();
                ctx.rect(x, y, map.cellSize, map.cellSize);
                ctx.stroke();
                ctx.fillStyle = cell.active ? color : '#606060';
                ctx.fill();
                ctx.closePath();

                ctx.fillStyle = 'yellow';
                ctx.font = '10px courier';
                ctx.fillText(Math.floor(cell.damage), x, y)
            });
        },
        shots: function (ctx, game) {
            var shots = game.shots,
            i = shots.length,
            shot;
            while (i--) {
                shot = shots[i];
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                if (shot.active) {
                    ctx.beginPath();
                    ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        explosions: function (ctx, game) {
            var exps = game.explosions,
            i = exps.length,
            alpha = 0.5,
            ex;
            while (i--) {
                ex = exps[i];
                alpha = 1 - ex.per;
                ctx.fillStyle = 'rgba(255,255,0,' + alpha + ')';
                ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';

                if (ex.active) {
                    ctx.beginPath();
                    ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        buttons: function (ctx) {
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'white';
            Object.keys(gameMod.buttons).forEach(function (key) {
                var b = gameMod.buttons[key];
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            });
        },
        // draw info
        info: function (ctx, game) {
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
            ctx.fillStyle = 'yellow';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('v' + game.ver, 10, 10);
            ctx.fillText('pos: ' + game.cross.offset.x.toFixed(2) + ',' + game.cross.offset.y.toFixed(2), 10, 20);
            ctx.fillText('percent remain: ' + game.map.percentRemain, 10, 30);
            ctx.fillText('weapon: ' + gameMod.Weapons[game.weaponIndex].name, 10, 40);
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 10, 50);
        }
    }
}
    ());
