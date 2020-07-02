
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
            opt.ptCount = opt.ptCount || 21;
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
                width: {
                    min: 3,
                    max: 20
                },
                turn: opt.turn === undefined ? 0 : opt.turn,
                segLength: 10,
                points: [],
                t:10000,
                tMax: 10000
            };
            blade.points = createPoints(blade, opt.ptCount)
                return blade;
        }
    }

}
    ());
