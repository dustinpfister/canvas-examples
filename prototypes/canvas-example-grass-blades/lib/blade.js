
var Blade = (function () {

    // public API
    return {
        // create a blade
        create: function (opt) {
            opt = opt || {};
            opt.segCount = opt.seqCount || 10;

            opt.canvas = opt.canvas || {
                width: 320,
                heigh: 240
            };
            opt.baseX = opt.baseX === undefined ? canvas.width / 2 : opt.baseX;
            return {
                basePos: {
                    y: canvas.height,
                    x: opt.baseX
                },
                segments: [],
                t: 0,
                tMax: 3000
            };
        }
    }

}
    ());
