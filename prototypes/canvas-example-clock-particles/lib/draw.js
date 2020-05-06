var draw = {};

draw.clear = function (canvas, ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

};

// draw a clock to a canvas
draw.clockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '40px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // percent done of day
    var text = clock.poolTotalActive; // Math.floor(clock.dayPer * 100) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2 - 20);
    // time
    ctx.font = '30px arial';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
};

draw.pool = function (canvas, ctx, clock) {
    var i = clock.pool.length,
    d,
    part;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    while (i--) {
        part = clock.pool[i];
        d = u.distance(part.x, part.y, 0, 0) / clock.faceRadius;
        if (part.active) {
            ctx.beginPath();
            ctx.arc(part.x, part.y, 5, 0, Math.PI * 2);

            ctx.fillStyle = 'rgba(255,0,0,' + (1 - d.toFixed(2)) + ')';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    }
    ctx.restore();
};

// draw day circle
draw.clockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, r);
    ctx.stroke();
};
