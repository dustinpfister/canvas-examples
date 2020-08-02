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
                per = cell.HP / cell.maxHP;
                ctx.beginPath();
                ctx.rect(x, y, map.cellSize, map.cellSize);
                ctx.stroke();
                ctx.fillStyle = 'rgba(0,200,0,' + per.toFixed(2) + ')';
                ctx.fill();
                ctx.closePath();
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
            ctx.fillText('percent kiled: ' + game.map.percentKilled, 10, 30);
        }
    }
}
    ());
