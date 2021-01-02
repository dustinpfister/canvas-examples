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
    ver: '0.20.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    debug: false, // debug mode on or off
    input: {
        pointer: {
            down: false,
            pos: {},
            dir: 0,
            dist: 0
        },
        degree: 0,
        degreesPerSecond: 90,
        //pps: 0,
        //ppsDelta: 1,
        fire: false,
        keys: {}
    }
};
// update pointer object helper
var updatePointer = function(game, pos){
    var map = game.map;
    // update dir so that we know the shortest direction to go
    var d = Math.floor(utils.angleTo(pos.x, pos.y, 160, 120) / ( Math.PI * 2 ) * 360);
    state.input.pointer.dir = utils.shortestDirection(d, Math.floor(map.degree), 360);
    // update dist
    state.input.pointer.dist = utils.distance(pos.x, pos.y, 160, 120);
};

var numberButtonCheck = function(game, input){
    if(game.mode === 'base'){
        [1,2,3].forEach(function(n){
            if(input.keys[n]){
                game.ship.weaponIndex = n - 1;
                game.ship.weapon = game.weapons[n - 1];
                game.buttons.currentPage = 'weapons';
                gameMod.updateButtons(game);
            }
        });
    }
};

// LOOP
var lt = new Date(),
FPS_target = 1000 / 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    game = state.game,
    map = game.map,
    input = state.input,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {
        // update input.pointer
        updatePointer(game, input.pointer.pos);
        // keyboard or pointer update map radian
        // keyboard update pps
        if(input.keys.w){
           map.pps += map.ppsDelta * secs;
           map.pps = map.pps > map.maxPPS ? map.maxPPS : map.pps;
        }
        if(input.keys.a){
            map.degree += map.degreesPerSecond * secs;
        }
        if(input.keys.d){
            map.degree -= map.degreesPerSecond * secs;
        }
        if(input.keys.s){
            map.pps -= map.ppsDelta * secs;
            map.pps = map.pps < 0 ? 0 : map.pps;
        }
        // pointer update map radian
        if(input.pointer.down && input.pointer.dist <= 32){
            if(input.pointer.dir === 1){
                map.degree += map.degreesPerSecond * secs;
            }
            if(input.pointer.dir === -1){
                map.degree -= map.degreesPerSecond * secs;
            }
        }
        // pointer update map pps
        if(input.pointer.down && input.pointer.dist < 32){
            var per = input.pointer.dist / 32;
            map.pps.pps = map.maxPPS * per;
        }
        // keyboard update fire
        input.fire = false;
        if(input.keys.l){
            input.fire = true;
        }
        // number button check
        numberButtonCheck(game, input);
        // wrap degree
        map.degree = utils.mod(map.degree, 360);
        // update game
        //gameMod.setMapMovement(game, input.degree, input.pps);
        map.radian = utils.wrapRadian(Math.PI / 180 * map.degree);
        gameMod.update(game, secs, state);
        // draw
        //draw.background(state.ctx, state);
        draw.currentMode(state.ctx, state);
        //draw.info(state.ctx, state);
        //draw.ver(state.ctx, state);
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
   var pos = state.input.pointer.pos = utils.getCanvasRelative(e);
   if(e.type === 'mousedown' || e.type === 'touchstart'){
       state.input.pointer.down = true;
   }
   //if((e.type === 'mousemove' || e.type === 'touchmove') && state.input.pointer.down){
   //}
   if(e.type === 'mouseup' || e.type === 'touchend'){
       state.input.pointer.down = false;
       gameMod.checkButtons(state.game, pos, e);
   }
};
canvas.addEventListener('mousedown', pointerEvent);
canvas.addEventListener('mousemove', pointerEvent);
canvas.addEventListener('mouseup', pointerEvent);
