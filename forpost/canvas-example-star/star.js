var starMod = (function () {

    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };

    // parse options
    var parseOptions = function (opt) {
        opt = opt || {};
        opt.pointCount = opt.pointCount || 5;
        opt.radius = opt.radius === undefined ? 50 : opt.radius;
        opt.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        opt.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        opt.ox = opt.ox || 0;
        opt.oy = opt.oy || 0;
        opt.pointSkip = opt.pointSkip || 2;
        return opt;
    };

    // public API
    return {
        // create a star points array by pointCount, and inner and outer radius
        create1: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                pt = getPoint(rd * i + rd / 2 + opt.radianAjust, opt.radiusInner, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        },
        // create a star by point count radius and point skip
        create2: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount * opt.pointSkip,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        }
    }

}
    ());
