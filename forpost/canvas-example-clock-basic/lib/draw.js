// draw a clock to a canvas
var drawClockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '30px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    var text = (clock.dayPer * 100).toFixed(3) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
};
// draw day circle
var drawClockDayCircle = function (canvas, ctx, clock) {
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
