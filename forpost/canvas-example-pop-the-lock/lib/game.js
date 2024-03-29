var gameMod = (function(){
    // MODES
    var modeAPI = {};
    var modes = {};
    // return the shortest distance to the target from the current position
    var getDistanceFromTarget = function(game){
        var dist = utils.shortestDistance(game.deg.current, game.deg.target, game.deg.total);
        return dist;
    };
    // distance from start to target helper
    var getDistanceFromStartToTarget = function(game){
        var dist = utils.shortestDistance(game.deg.start, game.deg.target, game.deg.total);
        return dist;
    };
    // helpers
    var getInRange = function (game) {
        return game.deg.distance <= game.deg.margin;
    };
    // get a target degree, with degOrgin, percent, and range arguments
    var getTarget = function(game, degOrgin, per, rangePer){
        degOrgin = degOrgin === undefined ? game.deg.current: degOrgin;
        per = utils.mod(per === undefined ? 0 : per, 1);
        rangePer = utils.clampPer(rangePer === undefined ? 1 : rangePer);
        var halfDeg = game.deg.total / 2,
        halfRange = halfDeg * rangePer,
        homeDeg = utils.mod(degOrgin + halfDeg, game.deg.total),
        deg = homeDeg - halfRange + (halfRange * 2 * per);
        return utils.mod(Math.round(deg), game.deg.total);
    };
    // get a target degree from a given degOrigin (0 to deg.total) 
    // by a margin (0 to deg.total) in a direction (1, -1)
    var getTargetFrom = function(game, degOrgin, margin, dir){
        margin = margin === undefined ? 0 : margin;
        dir = dir === undefined ? 1 : dir;
        return utils.mod(Math.round(degOrgin + margin * dir), game.deg.total);
    };
    // get a random target
    var getTargetRandom = modeAPI.getTargetRandom = function(game){
        return getTarget(game, game.deg.current, Math.random(), game.range);
    };
    // get a random target that is a 'trip up' target
    var getTargetRandomTripUp = function(game){
        var deltaDeg = utils.randomRange(game.tripUp.degRange);
        return getTargetFrom(game, game.deg.current + deltaDeg * game.dir);
    };
    // create and return a new target
    var newTarget = modeAPI.newTarget = function(game){
        var target = getTargetRandom(game);
        if(game.tripUp.count > 0){
            game.tripUp.count -= 1;
        }
        if(game.tripUp.count >= 1){
            target = getTargetRandomTripUp(game);
        }
        var roll = Math.random();
        if(roll < game.tripUp.chance){
            game.tripUp.count = Math.floor(utils.randomRange(game.tripUp.countRange));
            target = getTargetRandomTripUp(game);
        }
        game.deg.target = target;
        game.deg.start = game.deg.current;
        game.deg.totalDist = getDistanceFromStartToTarget(game);
        return target;
    };

    // public API
    var api = {};
    // make modes public
    api.modes = modes;
    // CREATE and return a main game object
    api.create = function(opt){
        opt = opt || {};
        var game = {                         // THE MAIN GAME OBJECT
            mode: opt.mode || 'freePlay',    // current game mode such as 'endurance', or 'freePlay' (see modes object)
            level: 1,
            targets: 1,
            delayMode: {                     // DELAY MODE SETTINGS
                active: false,
                secs: 0,
                delay: 0.5
            },
            deg: {                           // 'degree' object
               current: 25,                  // the current 'degree'
               start: 25,                    // a start deg to find and store total deg distance from start to target
               delta: 0,                     // current delta
               deltaTop: 0,                  // top delta recorded in update method
               perSec: 30,                   // degrees per second
               target: 0,                    // the target 'degree'
               total: 100,                   // total number of 'degrees'
               margin: 4,                    // the margin of 'degrees' +- from target that will still count as in range
               distance: 0,                  // should be the current distance in 'degrees' from target
               totalDist: 0                  // should be the distance from deg.start to deg.target
            },
            lateTrack: {                     // Late Tacking (to late to click target, not clicking to soon)
                canMiss: false,
                count: 0
            },
            clickTrack: {
                total: 0,                    // total number of clicks
                hits: 0                      // total number of clicks that are hits
            },
            tripUp: {                        // settings for 'tripUp' mode
                count: 0,
                chance: 0.12,
                countRange: [3, 10],
                degRange: [15, 25]
            },
            hp: {                            // hit points
                active: false,
                current: 5,
                max: 10,
                damage: 1
            },
            gameOver: false,
            win: false,
            pause: true,
            range: 0.5,                      // a number (0-1) that will set the range in which a new target can be
            dir: -1,                         // the direction in which the current degree will change
            inRange: false,                  // true if the current degree is in range of the target degree
            score: 0                         // player score
        };
        game.deg.target = newTarget(game);
        modes[game.mode].init(modeAPI, game, opt.modeSettings || {});
        game.deg.distance = getDistanceFromTarget(game);
        game.deg.start = game.deg.current;
        game.deg.totalDist = getDistanceFromStartToTarget(game);
        game.inRange = getInRange(game);
        game.delayMode.secs = game.delayMode.delay;
        return game;
    };
    // update
    api.update = function(game, secs){
        game.deg.delta = 0;
        if(!game.pause && !game.gameOver){

            // One way to fix the deg.delta problem is to have this 'delayMode'
            if(game.delayMode.active){
                game.delayMode.secs -= secs;
                if(game.delayMode.secs <= 0){
                    // if there is still delay time remaining
                    game.delayMode.active = false;
                    game.delayMode.secs = game.delayMode.delay;
                    game.deg.delta = game.deg.perSec * secs;
                }else{
                    var timeAjust = (game.deg.margin * 2) * ( ( game.delayMode.delay - game.delayMode.secs) / game.delayMode.delay);
                    game.deg.current = game.deg.target + (game.deg.margin - timeAjust) * (game.dir * -1);
                    game.deg.delta = game.deg.margin / game.delayMode.delay * secs;
                }
            }else{
                game.deg.delta = game.deg.perSec * secs;
            }

            //  cap the delta
            game.deg.delta = game.deg.delta >= game.deg.margin * 2 ? game.deg.margin * 2 * 0.95  : game.deg.delta;

            // !!!track top deg.delta (THIS IS DONE FOR DEBUGING only and as such may be removed at some point)
            if(game.deg.delta > game.deg.deltaTop){
                game.deg.deltaTop = game.deg.delta;
            }
            game.deg.current += game.deg.delta * game.dir;
            //game.deg.current = Math.floor(game.deg.current);
        } 
        game.deg.current = utils.mod(game.deg.current, game.deg.total);
        // current distance from target
        game.deg.distance = getDistanceFromTarget(game);
        game.inRange = getInRange(game);
        // !!! miss should be renamed to late to help make things less confusing
        if(game.inRange){
            game.lateTrack.canMiss = true;
            game.delayMode.active = true;
        }
        if(game.lateTrack.canMiss && !game.inRange && !game.delayMode.active){
//if(game.lateTrack.canMiss && !game.inRange){
            // call onMiss for the current mode
            modes[game.mode].onLate(modeAPI, game, secs);
            game.lateTrack.canMiss = false;
            game.delayMode.secs = game.delayMode.delay;
        }
        // call update method for the current mode
        modes[game.mode].update(modeAPI, game, secs);
    };
    // create click handler
    api.click = function (game, modeOptions) {
        if(!game.pause && !game.gameOver){
            game.clickTrack.total += 1;
            game.clickTrack.hits += game.inRange ? 1 : 0;
            if (game.inRange) {
                game.lateTrack.canMiss = false;
                game.dir = game.dir === 1 ? -1 : 1;
                game.delayMode.secs = game.delayMode.delay;
            }
            // in range or not delay mode is off now
            game.delayMode.active = false;
            // call on click for the current mode
            modes[game.mode].onClick(modeAPI, game, modeOptions);
        }
        game.pause = false;
    };
    // load a game mode file
    api.loadMode = function(gameMode){
        // props that should default to utils.noop
        ['init','update','onMiss','onClick', 'draw'].forEach(function(key){
            gameMode[key] = gameMode[key] || utils.noop;
        });
        gameMode.key = gameMode.key || 'nameMe-' + Object.keys(modes).length;
        gameMode.settings = gameMode.settings || [];
        gameMode.background = gameMode.background || '#4a4a4a';
        gameMode.createBackground = gameMode.createBackground || false;
        modes[gameMode.key] = gameMode;
    };
    // return public api
    return api;
}());
