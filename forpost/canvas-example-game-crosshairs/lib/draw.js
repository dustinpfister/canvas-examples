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

    var drawCellHealthBar = function (ctx, map, cell, cross) {
        var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
        y = cell.y * map.cellSize + cross.offset.y + (240 / 2);
        ctx.fillStyle = 'rgba(0,255,0,0.4)';
        ctx.fillRect(x, y, map.cellSize * (cell.HP / cell.maxHP), 5);
    };

    var setupDebug = function (ctx, game) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
    };

    var debugModes = {
        none: function (sm) {},
        general: function (sm) {
            var ctx = sm.ctx,
            canvas = sm.canvas,
            game = sm.game;
            setupDebug(ctx, sm.game);
            ctx.fillText('pos: ' + game.cross.offset.x.toFixed(2) + ',' + game.cross.offset.y.toFixed(2), 10, 10);
            ctx.fillText('percent remain: ' + Number(game.map.percentRemain * 100).toFixed(2), 10, 20);
            ctx.fillText('weapon: ' + gameMod.Weapons[game.weaponIndex].name, 10, 30);
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 10, 40);
            ctx.fillText('high damage cell: ' + Math.floor(game.map.highDamageCell), 10, 50);
        }
    };

    var cellTypeColors = ['green', 'blue', 'red'],
    sheets = genSheets.sheets;

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
                per = cell.HP / cell.maxHP;
                if (cell.active) {
                    ctx.drawImage(sheets[cell.typeIndex].canvas, 32 * Math.floor(9 - cell.HP / cell.maxHP * 9), 0, 32, 32, x, y, map.cellSize, map.cellSize);
                }
                drawCellHealthBar(ctx, map, cell, cross);
                ctx.fillStyle = '#00ff00';
                ctx.font = '10px courier';
                ctx.fillText(Math.floor(cell.damagePer * 100), x, y)
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
        buttons: function (ctx, buttons) {
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'white';
            Object.keys(buttons).forEach(function (key) {
                var b = buttons[key];
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                if (b.options) {
                    var str = b.options[b.currentOption || 0];
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'white';
                    ctx.fillText(str, b.x, b.y);
                }
            });
        },
        // draw info
        statBar: function (ctx, game) {
            ctx.fillStyle = 'yellow';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 0, 0);
            ctx.fillText('weapon: ' + gameMod.Weapons[game.weaponIndex].name, 0, 10);
            if (game.autoPlay.delay === 0) {
                ctx.fillText('autoPlay in effect', 0, 20);
            } else {
                ctx.fillText(game.autoPlay.delay.toFixed(2), 0, 20);
            }
        },
        debug: function (sm) {
            debugModes[sm.debugMode](sm, sm.ctx, sm.canvas);
        },
        ver: function (ctx, sm) {
            ctx.fillStyle = '#dfdfdf';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        }
    }
}
    ());
