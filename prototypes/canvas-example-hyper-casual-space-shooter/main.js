var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

// STATE
var canvasObj = createCanvas();
var state = {
    ver: '0.1.0',
    canvas : canvasObj.canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    input: {
        degree: 0,
        degreesPerSecond: 90,
        pps: 0,
        ppsDelta: 64,
        keys: {}
    }
};

var lt = new Date(),
FPS_target = 1000 / 30;

var loop = function () {
    var now = new Date(),
    t = now - lt,
    game = state.game,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {

        gameMod.updateMap(game, secs);

        var input = state.input;
        if(input.keys.a){
            input.degree += input.degreesPerSecond * secs;
        }
        if(input.keys.d){
            input.degree -= input.degreesPerSecond * secs;
            
        }
        if(input.keys.w){
           input.pps += input.ppsDelta * secs;
           input.pps = input.pps > game.map.maxPPS ? game.map.maxPPS : input.pps;
        }
        if(input.keys.s){
            input.pps -= input.ppsDelta * secs;
            input.pps = input.pps < 0 ? 0 : input.pps;
        }
        input.degree = utils.mod(input.degree, 360);
        gameMod.setMapMovement(game, input.degree, input.pps);

        draw.background(state.ctx, state.canvas);
        draw.gridLines(state.ctx, state, 'rgba(255,255,255,0.1)');
        draw.ship(state.ctx, state);
        draw.info(state.ctx, state);
        draw.ver(state.ctx, state);
        lt = now;
    }
};
loop();

// KEYBOARD EVENTS
window.addEventListener('keydown', function(e){
    //e.preventDefault();
    var key = e.key.toLowerCase();
    state.input.keys[key] = true;
});
window.addEventListener('keyup', function(e){
    //e.preventDefault();
    var key = e.key.toLowerCase();
    state.input.keys[key] = false;
});