var PM = (function () {

    var api = {};

    // new Pointer Movement State Object
    api.newPM = function () {
        return {
            down: false,
            angle: 0,
            dist: 0,
            delta: 0,
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

    // update the pm based on startPoint, and currentPoint
    api.updatePM = function (pm) {
        pm.dist = 0;
        pm.delta = 0;
        pm.angle = 0;
        if (pm.cp.x >= 0 && pm.cp.y >= 0) {
            pm.dist = u.distance(pm.sp.x, pm.sp.y, pm.cp.x, pm.cp.y);
        }
        if (pm.down && pm.dist >= 5) {
            var per = pm.dist / 64;
            per = per > 1 ? 1 : per;
            per = per < 0 ? 0 : per;
            pm.delta = per * 3;
            pm.angle = Math.atan2(pm.cp.y - pm.sp.y, pm.cp.x - pm.sp.x);
        }
    };

    // step a point by the current values of the pm
    api.stepPointByPM = function (pm, pt, invert) {

        invert = invert === undefined ? false : invert;
        invert = invert ? -1 : 1;

        pt.x += Math.cos(pm.angle) * pm.delta * invert;
        pt.y += Math.sin(pm.angle) * pm.delta * invert;
    };

    // when a pointer action starts
    api.onPointerStart = function (pm, pos, e) {
        pm.down = true;
        pm.sp = {
            x: pos.x,
            y: pos.y
        };
    };

    // when a pointer action moves
    api.onPointerMove = function (pm, pos, e) {
        pm.cp = {
            x: pos.x,
            y: pos.y
        };
    };

    // when a pointer actions ends
    api.onPointerEnd = function (pm, pos, e) {
        pm.down = false;
        pm.sp = {
            x: -1,
            y: -1
        };
        pm.cp = {
            x: -1,
            y: -1
        };
    };

    return api;

}
    ());
