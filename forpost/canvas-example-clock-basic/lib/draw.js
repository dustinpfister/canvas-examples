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
    var text = Math.floor(clock.dayPer * 100) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2 - 20);
    // time
    ctx.font = '20px arial';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
};

var drawMark = function(canvas, ctx, i, style, lineWidth){
    var radian = Math.PI * 2 / 12 * i,
    cx = canvas.width / 2,
    cy = canvas.height / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(radian);
    ctx.beginPath();
    ctx.moveTo((canvas.height - 50) / 3, 0);
    ctx.lineTo((canvas.height - 50) / 2, 0);
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
};

draw.hourMarks = function(canvas, ctx, clock){
    var i = 0,
    len = 12,
    radian;
    while(i < len){
        drawMark(canvas, ctx, i, 'white', 4);
        drawMark(canvas, ctx, i, 'black', 2);
        i += 1;
    }
};

draw.hands = function (canvas, ctx, clock) {
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    'secPer,minPer,hourPer,AMPMPer'.split(',').forEach(function (perName, i) {
        var r = Math.PI * 2 * clock[perName] - Math.PI / 2,
        radius = (canvas.height - 50 - 100 * (i / 4)) / 2,
        cx = canvas.width / 2,
        cy = canvas.height / 2;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(r) * radius, cy + Math.sin(r) * radius);
        ctx.stroke();
    });
};

draw.info = function (ctx, canvas, clock) {
    ctx.fillStyle = 'grey';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.textAlign = 'left';
    ctx.fillText('v' + clock.ver, 10, 10);
};

// draw day circle
draw.clockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, r);
    ctx.stroke();
};
