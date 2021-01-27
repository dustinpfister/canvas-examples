(function () {

    var canvasObj = u.createCanvas();
    var canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;

    var w = 24,
    h = 24;

    var grad = new gradient.Grid({
            cellWidth: canvas.width / w,
            cellHeight: canvas.height / h,
            gridWidth: w,
            gridHeight: h,
            init: ['rgb', 'random'],
            updaters: ['radiusGrow'],
            MIN_RADIUS: 3,
            MAX_RADIUS: 7,
            MAX_CPS: 5,
            objCount: 10
        });

    var lt = new Date(),
    target_fps = 20;
    var loop = function () {
        var now = new Date(),
        t = now - lt;
        requestAnimationFrame(loop);
        if (t > 1000 / target_fps) {
            grad.update();
            draw.back(ctx, canvas);
            draw.cells(ctx, grad);
            draw.info(ctx, canvas, grad);
            lt = now;
        }
    };

    loop();

}
    ());
