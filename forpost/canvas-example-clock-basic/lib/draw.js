var draw = {};
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
