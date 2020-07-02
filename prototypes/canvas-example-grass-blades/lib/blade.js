
var Blade = (function () {

    var createPoints = function (blade, ptCount) {
        var points = [],
        bp = blade.basePos,
        i = 0;
        while (i < ptCount) {
            points.push({
                x: bp.x,
                y: bp.y - blade.segLength * i
            });
            i += 1;
        }
        return points;

    };

    // public API
    return {
        // create a blade
        create: function (opt) {
            opt = opt || {};
            opt.ptCount = opt.ptCount || 10;
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
                segLength: 20,
                points: [],
                t: 0,
                tMax: 3000
            };
            blade.points = createPoints(blade, opt.ptCount)
                return blade;
        }
    }

}
    ());
