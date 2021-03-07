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
    var lt = new Date();
    // loop
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        //ptl.tick(game);
        //gameMod.tick(game);
        gameMod.update(game, secs);
        draw.background(ctx, canvas, '#0a0a0a');
        draw.PTL(ctx, canvas, game);
        draw.ver(ctx, canvas, game);
        lt = now;
    };
    loop();
    // attach event hanlder
    canvas.addEventListener('click', gameMod.click(game) );
}());
