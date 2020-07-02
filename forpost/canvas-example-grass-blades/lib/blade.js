
var Blade = (function () {

    var createPoints = function (blade, ptCount) {
        var points = [],
        bp = blade.basePos,
        i = 0,
        a,
        x = bp.x,
        y = bp.y;
        aDelta = Math.PI / 180 * blade.turn;
        while (i < ptCount) {
            a = Math.PI * 1.5 + aDelta / (ptCount - 2) * i;
            points.push({
                x: x,
                y: y
            });
            x += Math.cos(a) * blade.segLength;
            y += Math.sin(a) * blade.segLength;
            i += 1;
        }
        return points;
    };

    // public API
    return {
        // create a blade
        create: function (opt) {
            opt = opt || {};
            opt.ptCount = opt.ptCount || 24;
            opt.canvas = opt.canvas || {
                width: 320,
                heigh: 240
            };
            opt.baseX = opt.baseX === undefined ? canvas.width / 2 : opt.baseX;
            var blade = {
                basePos: {
                    y: canvas.height,
                    x: opt.baseX
                },
                r: opt.g === undefined ? 0 : opt.r,
                g: opt.g === undefined ? 255 : opt.g,
                b: opt.g === undefined ? 0 : opt.b,
                width: {
                    min: opt.widthMin || 3,
                    max: opt.widthMax || 20
                },
                turn: opt.turn === undefined ? 0 : opt.turn,
                segLength: opt.segLength === undefined ? 10: opt.segLength,
                points: [],
                t: opt.t === undefined ? 0 : opt.t,
                tMax: opt.tMax === undefined ? 0 : opt.tMax
            };
            blade.points = createPoints(blade, opt.ptCount)
                return blade;
        }
    }

}
    ());
