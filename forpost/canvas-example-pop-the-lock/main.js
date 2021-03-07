// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    });
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    var game = gameMod.create();

    //canvas.addEventListener('click', ptl.click);

    canvas.addEventListener('click', function(){
        ptl.click(game);
    });

    ptl.randomTarget(game);

    var loop = function () {
        requestAnimationFrame(loop);
        ptl.tick(game);
        drawPTL(ptl, ctx, canvas);
    };
    loop();

}
    ());
