// CANVAS
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

var canvasObj = createCanvas(),
canvas = canvasObj.canvas;

// STATE
var state = {
    ver: '0.11.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    input: {
        pointerDown: false,
        pointerPos: {},
        degree: 0,
        degreesPerSecond: 90,
        pps: 0,
        ppsDelta: 64,
        fire: false,
        keys: {}
    }
};

// LOOP
var lt = new Date(),
FPS_target = 1000 / 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    game = state.game,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {
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
        input.fire = false;
        if(input.keys.l){
            input.fire = true;
        }
        if(input.keys[1]){
            game.ship.weapon = game.weapons[0];
        }
        if(input.keys[2]){
            game.ship.weapon = game.weapons[1];
        }
        if(input.keys[3]){
            game.ship.weapon = game.weapons[2];
        }
        input.degree = utils.mod(input.degree, 360);
        // update game
        gameMod.setMapMovement(game, input.degree, input.pps);
        gameMod.updateMap(game, secs);
        gameMod.updateBlocks(game, secs, state);
        gameMod.updateShots(game, secs, state);
        // draw
        draw.background(state.ctx, state);
        draw.gridLines(state.ctx, state, 'rgba(255,255,255,0.1)');
        draw.blocks(state.ctx, state);
        draw.ship(state.ctx, state);
        draw.shots(state.ctx, state);
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

// MOUSE AND TOUCH

var pointerEvent = function(e){
   var pos = utils.getCanvasRelative(e);
   if(e.type === 'mousedown' || e.type === 'touchstart'){
       state.pointerDown = true;
       pointerEvent.start(e, pos);
   }
   if((e.type === 'mousemove' || e.type === 'touchmove') && state.pointerDown){
       pointerEvent.move(e, pos);
   }
   if(e.type === 'mouseup' || e.type === 'touchend'){
       state.pointerDown = false;
       pointerEvent.end(e, pos);
   }
};

var applyPosAsKey = function(pos){
    var d = Math.floor(utils.angleTo(pos.x, pos.y, 160, 120) / ( Math.PI * 2 ) * 360),
    dir = utils.shortestDirection(d, state.input.degree, 360);
    console.log(dir);
    //input.keys.a
    //if(d, )
};

pointerEvent.start = function(e, pos){
    applyPosAsKey(pos)
};
pointerEvent.move = function(e, pos){
   //console.log(pos.x, pos.y);
};
pointerEvent.end = function(e, pos){
   //console.log(pos.x, pos.y);
};


canvas.addEventListener('mousedown', pointerEvent);
canvas.addEventListener('mousemove', pointerEvent);
canvas.addEventListener('mouseup', pointerEvent);

