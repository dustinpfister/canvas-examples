var draw = (function () {
    return {
        // draw background
        back: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        cross: function (ctx, cross) {

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.arc(cross.center.x, cross.center.y, cross.radiusInner, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cross.center.x, cross.center.y, cross.radiusOutter, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cross.crosshairs.x, cross.crosshairs.y, cross.crosshairs.radius, 0, Math.PI * 2);
            ctx.stroke();

        }
    }
}
    ());
