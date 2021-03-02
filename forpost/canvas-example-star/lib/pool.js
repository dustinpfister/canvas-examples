
var pool = {};

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

var bounds = function(state, obj){
    var d = distance(obj.x, obj.y, state.canvas.width / 2, state.canvas.height / 2);
    if(d > 100){
        obj.x = state.canvas.width / 2;
        obj.y = state.canvas.height / 2;
    }
};

pool.update = function (state, secs) {
    var i = state.pool.length,
    obj;
    while (i--) {
        obj = state.pool[i];
        // move by heading and pps
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
        bounds(state, obj);
        obj.points = starMod.create1({
                pointCount: obj.pointCount,
                radius: obj.r1,
                radiusInner: obj.r2,
                radianAjust: obj.heading
            });
    }
};

pool.createState = function (opt) {
    opt = opt || {};
    var state = {
        canvas: opt.canvas,
        pool: []
    };
    var i = 0;
    while (i < 10) {
        state.pool.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            pointCount: 5 + Math.round(5 * Math.random()),
            r1: 30 + Math.round(20 * Math.random()),
            r2: 10 + Math.round(10 * Math.random()),
            heading: Math.PI * 2 * Math.random(),
            pps: 32,
            points: []
        });
        pool.update(state, 0);
        i += 1;
    }
    return state;
};
