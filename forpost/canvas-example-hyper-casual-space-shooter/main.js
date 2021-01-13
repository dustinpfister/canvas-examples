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
    ver: '0.28.0',
    canvas : canvas,
    ctx: canvasObj.ctx,
    game: gameMod.create({money: 100}),
    debug: false, // debug mode on or off
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
            ppsBar: {
                x: 5,
                y: 50,
                w: 16,
                h: 150,
                targetY: 200, // the target Y value for the speed to get to
                actualY: 50 + 75  // the actual Y value for the current speed
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
    headCir = pointer.headCir,
    ppsBar = pointer.ppsBar;
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
        if(utils.boundingBox(pos.x, pos.y, 1, 1, ppsBar.x, ppsBar.y, ppsBar.w, ppsBar.h)){
            ppsBar.targetY = pos.y;
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

// input modes for each game mode
var inputModes = {
    space: function(state, game){
    }
};

// SAVE STATE CHECK and LOOP START

var save = {
   appName: 'hyper-casual-space-shooter-save',
   gameSaves:[],
   slotIndex: 0,
   // update the current slotIndex with the given game object
   updateSlot: function(game){
       var createOptions = save.gameSaves[save.slotIndex];
       // save money to create options
       createOptions.money = game.money;
       // save upgrades
       createOptions.upgradeIndices = {};
       game.upgrades.forEach(function(upgrade){
           createOptions.upgradeIndices[upgrade.id] = upgrade.levelIndex;
       });
       // save map pos
       createOptions.mapX = game.map.x;
       createOptions.mapY = game.map.y;
       // weaponIndex
       createOptions.weaponIndex = game.ship.weaponIndex;
       // update jason
       localStorage.setItem(save.appName, JSON.stringify(save.gameSaves));
   }
};

//localStorage.removeItem(save.appName);

save.gameSaves = localStorage.getItem(save.appName);
if(save.gameSaves){
   console.log('save found, parsing');
   save.gameSaves = JSON.parse(save.gameSaves);
}else{
   console.log('no save found, creating new one');
   save.gameSaves=[{money:0, upgradeIndices:{}, mapX:0, mapY:0}];
   //localStorage.setItem(save.appName, JSON.stringify(save.gameSaves));
}

var createOptions = save.gameSaves[save.slotIndex];
state.game = gameMod.create(createOptions);

var keyboardShipInput = function(state, secs){
    var input = state.input,
    ppsBar = ppsBar = input.pointer.ppsBar,
    map = state.game.map;
    // set ppsBar that will set map.pps
    if(input.keys.w){
        ppsBar.targetY -= 100 * secs;
    }
    if(input.keys.s){
        ppsBar.targetY += 100 * secs;
    }
    // ajust degree that will set map.radian
    if(input.keys.a){
        map.degree += map.degreesPerSecond * secs;
    }
    if(input.keys.d){
        map.degree -= map.degreesPerSecond * secs;
    }
    // keyboard update fire
    input.fire = false;
    if(input.keys.l){
        input.fire = true;
    }
};

var applyPPSBar = function(state, secs){
   var input = state.input,
   ppsBar = input.pointer.ppsBar,
   map = state.game.map,
   speedPer = map.pps / map.maxPPS;
    // clamp targetY of ppsBar
    ppsBar.targetY = ppsBar.targetY < ppsBar.y ? ppsBar.y: ppsBar.targetY;
    ppsBar.targetY = ppsBar.targetY > ppsBar.y + ppsBar.h ? ppsBar.y + ppsBar.h: ppsBar.targetY;
    // update map pps based on targetY and actualY of the ppsBar
    if(ppsBar.targetY != ppsBar.actualY){
        if(ppsBar.actualY > ppsBar.targetY){
            map.pps += map.ppsDelta * secs;
            map.pps = map.pps > map.maxPPS ? map.maxPPS : map.pps;
            // update ppsBar.actualY based on map.pps over map.maxPPS
            ppsBar.actualY = ppsBar.y + ppsBar.h - ppsBar.h * speedPer;
            if(ppsBar.actualY < ppsBar.targetY){
                ppsBar.actualY = ppsBar.targetY;
            }
        }
        if(ppsBar.actualY < ppsBar.targetY){
            map.pps -= map.ppsDelta * secs;
            map.pps = map.pps < 0 ? 0 : map.pps;
            // update ppsBar.actualY based on map.pps over map.maxPPS
            ppsBar.actualY = ppsBar.y + ppsBar.h - ppsBar.h * speedPer;
            if(ppsBar.actualY > ppsBar.targetY){
                ppsBar.actualY = ppsBar.targetY;
            }
        }
    }
};

var pointerShipInput = function(state, secs){
    var input = state.input,
    headCir = input.pointer.headCir,
    map = state.game.map;

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
    speedPer = map.pps / map.maxPPS,
    ppsBar = input.pointer.ppsBar,
    secs = t / 1000;

    requestAnimationFrame(loop);

    if (t >= 1000 / state.FPS_target) {
        state.FPS = 1 / secs;
        // if new ship
        if(game.ship.newShip){
            ppsBar.targetY = 200;
            game.ship.newShip = false;
        }
        // update input.pointer
        updatePointer(game, input.pointer.pos);

        // pointer update map pps and radian
        pointerShipInput(state, secs);

        // keyboard update map pps and radian
        keyboardShipInput (state, secs);

        applyPPSBar(state, secs);

        // number button check
        numberButtonCheck(game, input);
        // wrap degree
        map.degree = utils.mod(map.degree, 360);
        // update game
        map.radian = utils.wrapRadian(Math.PI / 180 * map.degree);


        gameMod.update(game, secs, state);

        // draw
        draw.currentMode(state.ctx, state);
        draw.pointerUI(state.ctx, state);

        // update slot
        save.updateSlot(game);

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
    if(key === 'n'){
       gameMod.loopPointers(state.game);
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
