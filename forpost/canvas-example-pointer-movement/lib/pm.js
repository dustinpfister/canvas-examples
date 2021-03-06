var PM = (function () {
    // HELPERS
    // lock angle to dirs helper
    var lockToDirs = function(radian, dirCount){
        var dir = Math.round(radian / utils.TAU * dirCount);
        return utils.mod(utils.TAU / dirCount * dir, utils.TAU);
    };
    // apply the current mode to angle
    var applyMode = function(pm, radian){
        if(pm.mode.substr(0, 3) === 'dir'){
            var dirCount = Number(pm.mode.substr(3, pm.mode.length));
            dirCount = String(dirCount) === 'NaN' ? 360 : dirCount;
            dirCount = dirCount <= 0 ? 360 : dirCount;
            pm.angle = lockToDirs(radian, dirCount);
        }
    };
    // PUBLIC API
    var api = {};
    // new Pointer Movement State Object
    api.create = function (opt) {
        opt = opt || {};
        return {
            ver: '0.2.0',
            secs: 0,
            longDownTime: opt.longDownTime || 3,
            mode: opt.mode || 'dir1440',
            modeIndex: 0,
            modesList: opt.modesList || 'dir360,dir8,dir4,dir1440,fine'.split(','),
            down: false,
            angle: 0,
            dist: 0,
            distMin: opt.distMin === undefined ? 16 : opt.distMin,
            distMax: opt.distMax || 64,
            per:0,
            PPS: 0,
            maxPPS: opt.maxPPS === undefined ? 128 : opt.maxPPS,
            sp: { // start point
                x: 0,
                y: 0
            },
            cp: { // current point
                x: 0,
                y: 0
            }
        };
    };
    // update the pm based on startPoint, and currentPoint
    api.update = function (pm, secs) {
        pm.dist = 0;
        pm.PPS = 0;
        pm.angle = 0;
        pm.mode = pm.modesList[pm.modeIndex];
        // set pm.dist
        pm.dist = utils.distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        // set pps and angle if dist is greater than min and pointer is down
        if (pm.down && pm.dist >= pm.distMin) {
            pm.secs = 0;
            pm.per = (pm.dist - pm.distMin) / pm.distMax;
            pm.per = pm.per > 1 ? 1 : pm.per;
            pm.per = pm.per < 0 ? 0 : pm.per;
            pm.PPS = pm.per * pm.maxPPS;
            var radian = utils.mod(Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x), utils.TAU);
            // default to radian for 'fine' mode (or any mode other than dirN)
            pm.angle = radian;
            applyMode(pm, radian);
        }else{
            pm.secs += secs;
            pm.secs = pm.secs >= pm.longDownTime ? pm.longDownTime: pm.secs;
            if(pm.secs == pm.longDownTime){
                pm.modeIndex += 1;
                pm.modeIndex = utils.mod(pm.modeIndex, pm.modesList.length);
                pm.secs = 0;
            }
        }
    };
    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, secs) {
        secs = secs === undefined ? 1 : secs;
        pt.x += Math.cos(pm.angle) * pm.PPS * secs;
        pt.y += Math.sin(pm.angle) * pm.PPS * secs;
    };
    // when a pointer action starts
    api.onPointerStart = function (pm) {
        return function(e){
            var pos = utils.getCanvasRelative(e);
            pm.down = true;
            pm.secs = 0;
            pm.sp = {
                x: pos.x,
                y: pos.y
            };
            pm.cp = {
                x: pos.x,
                y: pos.y
            };
        };
    };
    // when a pointer action moves
    api.onPointerMove = function (pm) {
        return function(e){
            var pos = utils.getCanvasRelative(e);
            pm.cp = {
                x: pos.x,
                y: pos.y
            };
        };
    };
    // when a pointer actions ends
    api.onPointerEnd = function (pm) {
        return function(e){
            var pos = utils.getCanvasRelative(e);
            pm.down = false;
            pm.secs = 0;
            pm.sp = {
                x: 0,
                y: 0
            };
            pm.cp = {
                x: 0,
                y: 0
            };
        };
    };
    // return the public API
    return api;
}
    ());
