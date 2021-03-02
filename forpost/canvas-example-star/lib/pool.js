
var pool = {};

// appy bounds
var bounds = function(state, obj){
    var cx = state.canvas.width / 2,
    cy = state.canvas.height / 2;
    //var d = utils.distance(obj.x, obj.y, cx, cy);
    if(obj.d > state.maxDist){
        var a = Math.atan(cy - obj.y, cx - obj.x);
        obj.x = cx + Math.cos(a) * ( state.maxDist - 10 );
        obj.y = cy + Math.sin(a) * ( state.maxDist - 10 );
        obj.d = utils.distance(obj.x, obj.y, cx, cy);
    }
};

pool.update = function (state, secs) {
    var i = state.pool.length,
    cx = state.canvas.width / 2,
    cy = state.canvas.height / 2,
    obj;
    while (i--) {
        obj = state.pool[i];
        // move by heading and pps
        obj.x += Math.cos(obj.heading) * obj.pps * secs;
        obj.y += Math.sin(obj.heading) * obj.pps * secs;
        obj.d = utils.distance(obj.x, obj.y, cx, cy);
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
        maxDist: opt.maxDist || 50,
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
