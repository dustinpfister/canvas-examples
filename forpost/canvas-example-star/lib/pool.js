
var pool = {};

pool.update = function (state, secs) {
    var i = state.pool.length,
    obj;
    while (i--) {
        obj = state.pool[i];
        obj.points = starMod.create1({
                pointCount: obj.pointCount,
                radius: 40,
                radiusInner: 20,
                radianAjust: Math.PI * 1.5
            });
    }
};

pool.createState = function () {
    var state = {
        pool: []
    };
    var i = 0;
    while (i < 10) {
        state.pool.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            pointCount: 5 + Math.round(10 * Math.random()),
            points: []
        });
        pool.update(state, 0);
        i += 1;
    }
    return state;
};
