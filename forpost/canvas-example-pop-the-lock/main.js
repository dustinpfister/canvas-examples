// SETUP CANVAS
(function(){
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
    // create game state
    var game = gameMod.create();
    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        //ptl.tick(game);
        gameMod.tick(game);
        draw.background(ctx, canvas, '#0a0a0a');
        draw.PTL(ctx, canvas, game);
        draw.ver(ctx, canvas, game);
    };
    loop();
    // attach event hanlder
    canvas.addEventListener('click', gameMod.click(game) );
}());
