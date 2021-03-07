// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    });
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    canvas.addEventListener('click', ptl.click);

    ptl.randomTarget();

    var loop = function () {
        requestAnimationFrame(loop);
        ptl.tick();
        drawPTL(ptl, ctx, canvas);
    };
    loop();

}
    ());
