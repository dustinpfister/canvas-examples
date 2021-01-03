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
    ver: '0.21.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create(),
    debug: true, // debug mode on or off
    input: {
        pointer: {
            down: false,
            pos: {x:0,y:0},
            dir: 0,
            headCir: { // the heading circle use to set a target heading for the ship
                x: 320 - 30,
                y: 240 - 30,
                r: 24,
                dist: 0,
                a: 0,
                d: 0,
                dir: 0
            },
            dist: 0 // dist from 160, 120 ( or 0,0 when it comes to game state)
        },
        //degree: 0,
        //degreesPerSecond: 90,
        //pps: 0,
        //ppsDelta: 1,
        fire: false,
        keys: {}
    },
    lt : new Date(),
    FPS_target : 20,
    FPS: 0
};
// update pointer object helper
var updatePointer = function(game, pos){
    var map = game.map,
    input = state.input,
    pointer = input.pointer,
    headCir = pointer.headCir;
    // update dir so that we know the shortest direction to go
    var d = Math.floor(utils.angleTo(pos.x, pos.y, 160, 120) / ( Math.PI * 2 ) * 360);
    pointer.dir = utils.shortestDirection(d, Math.floor(map.degree), 360);
    // update main dist
    pointer.dist = utils.distance(pos.x, pos.y, 160, 120);
    // update headCir
    if(pointer.down){
        headCir.dist = utils.distance(pos.x, pos.y, headCir.x, headCir.y);
        headCir.dist = headCir.dist > headCir.r ? headCir.r: headCir.dist;
        if(headCir.dist < headCir.r){
            headCir.a = utils.angleTo(pos.x, pos.y, headCir.x, headCir.y);
            headCir.d = Math.floor(headCir.a / ( Math.PI * 2 ) * 360);
            headCir.dir = utils.shortestDirection(headCir.d, Math.floor(map.degree), 360);
        }
    }
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
//var lt = new Date(),
//FPS_target = 1000 / 30;
var loop = function () {

    var now = new Date(),
    t = now - state.lt,
    game = state.game,
    map = game.map,
    input = state.input,
    secs = t / 1000;

    requestAnimationFrame(loop);

    if (t >= 1000 / state.FPS_target) {

        state.FPS = 1 / secs;

        // update input.pointer
        updatePointer(game, input.pointer.pos);
        // keyboard or pointer update map radian

        // keyboard update map pps
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
        var headCir = input.pointer.headCir;
        //if(input.pointer.down && input.pointer.dist <= 32){
        if(input.pointer.down && headCir.dist < headCir.r){
            //if(input.pointer.dir === 1){
            if(headCir.dir === 1){
                map.degree += map.degreesPerSecond * secs;
            }
            //if(input.pointer.dir === -1){
            if(headCir.dir === -1){
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
        draw.currentMode(state.ctx, state);
        draw.pointerUI(state.ctx, state);

        state.lt = now;
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
    // toggle debug mode
    if(key === 'v'){
       state.debug = !state.debug;
    }
    if(key === 'b'){
       state.game.autoFire = !state.game.autoFire;
    }
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
