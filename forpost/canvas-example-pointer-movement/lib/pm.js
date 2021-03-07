var PM = (function () {

    var api = {};

    // new Pointer Movement State Object
    api.create = function (opt) {
        opt = opt || {};
        return {
            ver: '0.2.0',
            mode: opt.mode || 'fine',
            down: false,
            angle: 0,
            dist: 0,
            distMin: opt.distMin === undefined ? 16 : opt.distMin,
            distMax: opt.distMax || 64,
            per:0,
            PPS: 0,
            maxPPS: opt.maxPPS === undefined ? 128 : opt.maxPPS,
            sp: { // start point
                x: -1,
                y: -1
            },
            cp: { // current point
                x: -1,
                y: -1
            }
        };
    };

    var lockToDirs = function(radian, dirs){

    };

    // update the pm based on startPoint, and currentPoint
    api.update = function (pm) {
        pm.dist = 0;
        pm.PPS = 0;
        pm.angle = 0;
        // set pm.dist
        pm.dist = utils.distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        // set pps and angle if dist is greater than min and pointer is down
        if (pm.down && pm.dist >= pm.distMin) {
            pm.per = (pm.dist - pm.distMin) / pm.distMax;
            pm.per = pm.per > 1 ? 1 : pm.per;
            pm.per = pm.per < 0 ? 0 : pm.per;
            pm.PPS = pm.per * pm.maxPPS;
            var radian = utils.mod(Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x), utils.TAU);
            var dir = Math.round(radian / utils.TAU * 4);
  
            pm.angle = utils.mod(utils.TAU / 4 * dir, utils.TAU);
        }
    };

    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, secs) {
        secs = secs === undefined ? 1 : secs;
        pt.x += Math.cos(pm.angle) * pm.PPS * secs;
        pt.y += Math.sin(pm.angle) * pm.PPS * secs;
    };

    // when a pointer action starts
    api.onPointerStart = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };

    // when a pointer action moves
    api.onPointerMove = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };

    // when a pointer actions ends
    api.onPointerEnd = function (pm, e) {
        var pos = utils.getCanvasRelative(e);
        pm.down = false;
        pm.sp = {
            x: 0,
            y: 0
        };
        pm.cp = {
            x: 0,
            y: 0
        };
    };

    return api;

}
    ());
