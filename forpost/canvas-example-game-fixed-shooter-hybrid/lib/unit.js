var unit = (function () {

    var createBaseUnit = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
            heading: opt.heading === undefined ? 0 : opt.heading,
            pps: opt.pps === undefined ? 0 : opt.pps
        };
    };

    return {
        create: createBaseUnit,
        update: function (unit, secs) {
            secs = secs === undefined ? 0 : secs;
            unit.x += Math.cos(unit.heading) * unit.pps * secs;
            unit.y += Math.sin(unit.heading) * unit.pps * secs;
        }
    };

}
    ());
