var draw = (function () {

    var drawPartBase = function (part) {
        ctx.fillStyle = part.type === 'hunter' ? 'red' : 'blue';
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };

    var drawPartHeading = function (part) {
        var x = Math.cos(part.heading) * part.radius * 2 + part.x,
        y = Math.sin(part.heading) * part.radius * 2 + part.y;
        ctx.beginPath();
        ctx.moveTo(part.x, part.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    var drawPartHealth = function (part) {
        var x = part.x - part.radius,
        y = part.y + part.radius + 3,
        w = part.radius * 2,
        h = part.radius / 2,
        per = part.hp / part.hpMax;
        ctx.fillStyle = 'rgba(128,128,128,1)';
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.beginPath();
        ctx.rect(x, y, w * per, h);
        ctx.fill();
    };

    var drawPartAttackRange = function (part) {
        if (part.type === 'hunter') {
            ctx.fillStyle = 'rgba(255,0,0,0.5)';
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.radiusAttack, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    return {

        // draw background
        back: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },

        pool: function (state) {
            var ctx = state.ctx,
            canvas = state.canvas,
            pool = state.pool,
            len = pool.length,
            part,
            i = 0;
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            while (i < len) {
                part = pool[i];
                drawPartBase(part);
                drawPartHeading(part);
                drawPartHealth(part);
                drawPartAttackRange(part);
                i += 1;
            }
        },

        ver: function(ctx, canvas, state){
            ctx.fillStyle = 'gray';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('v' + state.ver, 5, canvas.height - 15);
        }

    };

}
    ());
