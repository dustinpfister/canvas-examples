var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, pool) {
    var i = pool.objects.length,
    obj;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    while (i--) {
        obj = pool.objects[i];
        if (obj.active) {
            ctx.save();
            ctx.fillStyle = obj.data.fill || 'white';
            ctx.globalAlpha = obj.data.alpha || 1;
            ctx.translate(obj.x, obj.y);
            ctx.rotate(obj.heading);
            ctx.beginPath();
            ctx.rect(obj.w / 2 * -1, obj.h / 2 * -1, obj.w, obj.h);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
};

draw.ver = function (ctx, state) {
    ctx.font = '10px couriter';
    ctx.fillStyle = 'white';
    ctx.fillText('v' + state.ver, 5, 15);
};
