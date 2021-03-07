// DRAW
var drawPTL = function (ptl, ctx, canvas) {

    var r,
    x,
    y;

    // background
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw base circle
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();

    // draw target range

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100,
        utils.mod(ptl.sec_target - ptl.sec_margin, ptl.sec_total) / ptl.sec_total * Math.PI * 2,
        utils.mod(ptl.sec_target + ptl.sec_margin, ptl.sec_total) / ptl.sec_total * Math.PI * 2);
    ctx.stroke();

    // draw current
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    r = ptl.sec_current / ptl.sec_total * Math.PI * 2;
    x = Math.cos(r) * 100 + canvas.width / 2;
    y = Math.sin(r) * 100 + canvas.height / 2;
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();

    // score
    ctx.fillStyle = ptl.score > 0 ? 'green' : 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '25px arial';
    ctx.fillText(ptl.score, canvas.width / 2, canvas.height / 2);

    // info
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.35;
    ctx.font = '10px arial';
    ctx.fillText('sec_current ' + ptl.sec_current.toFixed(2), 10, 10);
    ctx.fillText('inrange ' + ptl.inRange, 10, 20);

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font='10px arial';
    ctx.textAlign = 'left';
    ctx.fillText('v' + ptl.ver, 5, canvas.height - 15);

};
