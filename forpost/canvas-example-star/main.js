(function(){
    // CONSTANTS
    var STAR_SIZE_MIN = 37.5,
    STAR_SIZE_MAX = 150;
    // create canvas
    var canvasObj = utils.createCanvas({
        width: 640,
        height: 480
    }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
    // main state object
    var state = pool.createState({
        //count: 15,
        starSizeMax: STAR_SIZE_MAX,
        starSizeMin: STAR_SIZE_MIN,
        starPPSMax: 200,
        starPPSMin: 100,
        maxDist: canvas.width / 2,
        canvas: canvas
    }),
    lt = new Date();
    // background
    state.background = draw.createBackground(ctx, canvas)
    // main app loop
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        draw.background(ctx, canvas, state.background);
        state.pool.forEach(function(obj){
            draw.star(ctx, obj);
        });
        draw.ver(ctx, state);
        pool.update(state, secs);
        lt = now;
    };
    loop();
}());