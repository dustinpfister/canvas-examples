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
    canvas : canvasObj.canvas,
    ctx: canvasObj.ctx,
    ship: { 
        x: 0, // ship position relative to map position
        y: 0,
    },
    map: { // map position
        x: -16,
        y: -16,
        radian: Math.PI / 180 * 45,
        pps: 64
    }
};

var lt = new Date(),
FPS_target = 1000 / 30;

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {

        state.map.x += Math.cos(state.map.radian) * state.map.pps * secs;
        state.map.y += Math.sin(state.map.radian) * state.map.pps * secs;
        state.map.radian += Math.PI / 180 * 45 * secs;
        state.map.radian = state.map.radian > Math.PI * 2 ? state.map.radian % (Math.PI * 2) : state.map.radian;

        draw.background(state.ctx, state.canvas);
        draw.gridLines(state.ctx, state, 'white');
        draw.ship(state.ctx, state);
        draw.info(state.ctx, state);
        lt = now;
    }
};
loop();