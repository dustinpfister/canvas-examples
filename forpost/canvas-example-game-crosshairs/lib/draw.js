var draw = (function () {

    var hpColors = ['red', 'orange', 'lime'];

    var getHpColor = function (per) {
        return hpColors[Math.floor((hpColors.length - 0.01) * per)];
    };

    var drawBar = function (ctx, game, per, rStart, rLength, fill) {
        var cross = game.cross,
        center = cross.center;
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength);
        ctx.stroke();
        ctx.strokeStyle = fill || 'lime';
        ctx.beginPath();
        ctx.arc(center.x, center.y, cross.radiusInner + 5, rStart, rStart + rLength * per);
        ctx.stroke();
    };

    // draw the inner and outer cross circles
    var drawCrossCircles = function (ctx, cross) {
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.fillStyle = 'rgba(255,0,0,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.arc(cross.center.x, cross.center.y, cross.radiusOuter, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
        ctx.stroke();
    };

    var drawCrossHairs = function (ctx, cross) {
        var ch = cross.crosshairs;
        ctx.strokeStyle = 'rgba(200,0,0,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - ch.radius * 1.5);
        ctx.lineTo(ch.x, ch.y + ch.radius * 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - ch.radius * 1.5, ch.y);
        ctx.lineTo(ch.x + ch.radius * 1.5, ch.y);
        ctx.stroke();
    };

    var drawPercentRemainBar = function (ctx, game) {
        var cross = game.cross,
        center = cross.center,
        map = game.map;
        drawBar(ctx, game, map.percentRemain, Math.PI, Math.PI / 2, getHpColor(map.percentRemain));
    };

    var drawAutoPlayDelayBar = function (ctx, game) {
        var ap = game.autoPlay;
        drawBar(ctx, game, ap.delay / ap.maxDelay, 0, Math.PI / 4, 'cyan');
    };

    // draw the current weapon info
    var drawWeaponInfo = function (ctx, game) {
        var center = game.cross.center;
        var w = game.weapons[game.weaponIndex];
        ctx.fillStyle = '#ff6060';
        ctx.font = '10px courier';
        ctx.textAlign = 'center';
        ctx.fillText('Weapon: ' + w.name, center.x, center.y + 75);
        ctx.fillText('maxDPS: ' + Number(w.maxDPS).toFixed(2), center.x, center.y + 85);
    };

    // draw a health bar for a cell
    var drawCellHealthBar = function (ctx, map, cell, cross) {
        var x = cell.x * map.cellSize + cross.offset.x + (320 / 2),
        y = cell.y * map.cellSize + cross.offset.y + (240 / 2);
        //ctx.fillStyle = 'rgba(0,255,0,0.4)';
        ctx.fillStyle = getHpColor(cell.HP / cell.maxHP);
        ctx.globalAlpha = 0.5;
        ctx.fillRect(x, y, map.cellSize * (cell.HP / cell.maxHP), 5);
        ctx.globalAlpha = 1;
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

    var cellLevel = function (ctx, cell, x, y) {
        if (cell.active) {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '7px courier';
            ctx.fillText('L' + Math.floor(cell.levelObj.level), x + 3, y + 3);
        }
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
            ctx.fillText('weapon: ' + sm.game.weapons[game.weaponIndex].name, 10, 30);
            ctx.fillText('damage: ' + Math.floor(game.totalDamage), 10, 40);
            ctx.fillText('high damage cell: ' + Math.floor(game.map.highDamageCell), 10, 50);
        },
        weapon: function (sm) {
            var ctx = sm.ctx;
            setupDebug(ctx, sm.game);
            var w = sm.game.weapons[sm.game.weaponIndex];
            ctx.fillText('Current weapon: ', 10, 10);
            ctx.fillText('name: ' + w.name, 10, 20);
            ctx.fillText('maxDPS: ' + w.maxDPS, 10, 30);
            ctx.fillText('accuracy: ' + Number(w.accuracy).toFixed(2), 10, 40);
            ctx.fillText('locked: ' + w.locked, 10, 50);
            ctx.fillText('unLockAt: ' + w.unLockAt, 10, 60);
        },
        level: function (sm) {
            var ctx = sm.ctx,
            lv = sm.game.levelObj;
            setupDebug(ctx, sm.game);
            ctx.fillText('Current level: ' + lv.level, 10, 10);
            ctx.fillText('xp: ' + lv.xp, 10, 20);
            ctx.fillText('forNext level: ' + lv.forNext, 10, 30);
            ctx.fillText('toNext level: ' + lv.toNext, 10, 40);
            ctx.fillText('per: ' + lv.per.toFixed(2), 10, 50);
            ctx.fillText('forLast: ' + lv.forLast, 10, 60);
        },
        map: function (sm) {
            var ctx = sm.ctx,
            game = sm.game,
            map = game.map;
            setupDebug(ctx, game);

            ctx.fillText('map level: ' + game.mapLevelObj.level, 10, 10);
            ctx.fillText('map size: ' + map.cellWidth + 'x' + map.cellHeight, 10, 20);
            ctx.fillText('cellLevelCap: ' + map.cellLevel.cap, 10, 30);
            ctx.fillText('cellDeltaNext: ' + map.cellLevel.deltaNext, 10, 40);
            ctx.fillText('gen rate (count): ' + map.gen.rate + ' (' + map.gen.count + ')', 10, 50);

            ctx.fillText('map.percentRemain: ' + map.percentRemain.toFixed(2), 10, 100);

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
        cross: function (ctx, game) {
            // draw basic circles
            drawCrossCircles(ctx, game.cross);
            // bars
            drawPercentRemainBar(ctx, game); // percentRemain
            drawAutoPlayDelayBar(ctx, game); // autoPlay delay
            drawBar(ctx, game, game.levelObj.per, Math.PI * 1.69, Math.PI * 0.3, 'blue'); // next level
            drawBar(ctx, game, game.shotSecs / game.shotRate, Math.PI * 0.33, Math.PI * 0.15, 'red'); // shotRate
            drawBar(ctx, game, game.mana.current / game.mana.max, Math.PI * 0.5, Math.PI * 0.15, 'purple');
            // weapon info
            drawWeaponInfo(ctx, game);
            // draw cell and level info
            var cross = game.cross,
            map = game.map,
            ch = game.cross.crosshairs,
            cell = mapMod.getWithCanvasPointAndOffset(game.map, ch.x, ch.y, cross.offset.x, cross.offset.y),
            x = cross.center.x + cross.radiusOuter - 45,
            y = cross.center.y;
            // text style for info
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.font = '8px arial';
            // main game level info
            ctx.fillText('level: ' + game.levelObj.level + ' (' + Math.round(game.levelObj.per * 100) + '%)', x, y - 50);
            ctx.fillText('xp: ' + Math.floor(game.levelObj.xp), x, y - 40);
            ctx.fillText('next: ' + Math.floor(game.levelObj.toNext), x, y - 30);
            ctx.fillText('mana: ' + Math.floor(game.mana.current) + '/' + Math.floor(game.mana.max) + ' (' + game.mana.mps + '/s)', x, y - 20);
            // cell info
            if (cell) {
                ctx.fillText('pos: ' + cell.i + ' (' + cell.x + ',' + cell.y + ')', x, y);
                ctx.fillText('lv:' + cell.levelObj.level + ' (' + Math.round(cell.levelObj.per * 100) + '%)', x, y + 10);
                ctx.fillText('hp:' + Math.floor(cell.HP) + '/' + Math.floor(cell.maxHP), x, y + 20);
                ctx.fillText('dam: ' + Math.floor(cell.damage) + ' (' + Math.round(cell.damagePer * 100) + '%)', x, y + 30);
                // draw target cell
                ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                ctx.lineWidth = 3;
                ctx.strokeRect(cell.x * map.cellSize + cross.offset.x + (320 / 2), cell.y * map.cellSize + cross.offset.y + (240 / 2), map.cellSize, map.cellSize);
            }
            // draw the cross hairs
            drawCrossHairs(ctx, game.cross);
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
                    // for active cell
                    ctx.drawImage(sheets[cell.typeIndex].canvas, 32 * Math.floor(9 - cell.HP / cell.maxHP * 9), 0, 32, 32, x, y, map.cellSize, map.cellSize);
                    if (per < 1) {
                        drawCellHealthBar(ctx, map, cell, cross);
                    }
                } else {
                    // for inactive cell
                    ctx.lineWidth = 1;
                    var c = 50 + Math.round(200 * cell.damagePer);
                    ctx.strokeStyle = 'rgba(0,128,128, 0.4)';
                    ctx.fillStyle = 'rgba(0,' + c + ',' + c + ', 0.7)';
                    ctx.beginPath();
                    ctx.rect(x, y, map.cellSize, map.cellSize);
                    ctx.fill();
                    ctx.stroke();
                }
                cellLevel(ctx, cell, x, y);
                //cellDebug(ctx, cell, x, y);
            });
        },
        shots: function (ctx, game) {
            var shots = game.shots,
            offset = game.cross.offset,
            x,
            y,
            i = shots.length,
            shot;
            while (i--) {
                shot = shots[i];
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                if (shot.active) {
                    ctx.beginPath();
                    x = shot.x + offset.x + (320 / 2);
                    y = shot.y + offset.y + (240 / 2);
                    ctx.arc(x, y, shot.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        explosions: function (ctx, game) {
            var exps = game.explosions,
            offset = game.cross.offset,
            i = exps.length,
            x,
            y,
            alpha = 0.5,
            ex;
            while (i--) {
                ex = exps[i];
                alpha = 1 - ex.per;
                ctx.fillStyle = 'rgba(255,255,0,' + alpha + ')';
                ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
                if (ex.active) {
                    ctx.beginPath();

                    x = ex.x + offset.x + (320 / 2);
                    y = ex.y + offset.y + (240 / 2);
                    ctx.arc(x, y, ex.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        },
        buttons: function (ctx, buttons) {
            Object.keys(buttons).forEach(function (key) {
                var b = buttons[key];
                ctx.fillStyle = 'red';
                if (b.type === 'toggle' && b.bool) {
                    ctx.fillStyle = 'lime';
                }
                ctx.strokeStyle = 'gray';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.font = (b.fontSize || 10) + 'px arial';
                if (b.type === 'options') {
                    var str = b.options[b.currentOption || 0];
                    ctx.fillText(str, b.x, b.y);
                }
                if (b.type === 'basic') {
                    ctx.fillText(b.label, b.x, b.y);
                }
                if (b.type === 'toggle') {
                    ctx.fillText(b.label, b.x, b.y);
                }
                if (b.type === 'upgrade') {
                    ctx.fillText(b.label, b.x, b.y);
                    ctx.font = '8px courier';
                    ctx.fillText(b.info, b.x, b.y + 10);
                }
            });
        },
        mapInfo: function (ctx, game) {
            var map = game.map,
            mapLevelObj = game.mapLevelObj;
            // draw mapLevel info
            ctx.textAlign = 'center';
            ctx.fillText('mapLevel : ' + mapLevelObj.level, 160, 80);
            ctx.fillText('size : ' + map.cellWidth + ' x ' + map.cellHeight, 160, 90);
            ctx.fillText('Max Cell Level : ' + map.cellLevel.cap, 160, 100);
            ctx.fillText('Level Up Rate : ' + map.cellLevel.deltaNext, 160, 110);
            ctx.fillText('Cell Gen Rate : ' + map.gen.rate.toFixed(2), 160, 120);
            ctx.fillText('Cell Gen Count : ' + map.gen.count, 160, 130);
        },
        debug: function (sm) {
            debugModes[sm.debugMode](sm, sm.ctx, sm.canvas);
        },
        skillPointInfo: function (ctx, sm) {
            var skillPoints = sm.game.skillPoints;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.fillText('skillPoints: ' + skillPoints.free + '/' + skillPoints.total, 10, 10);
        },
        ver: function (ctx, sm) {
            ctx.fillStyle = '#dfdfdf';
            ctx.textAlign = 'left';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        }
    }
}
    ());
