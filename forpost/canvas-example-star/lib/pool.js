
var pool = {};

pool.update = function (state, secs) {
    var i = state.pool.length,
    obj;
    while (i--) {
        obj = state.pool[i];
		
		// move by heading and pps
		obj.x += Math.cos(obj.heading) * obj.pps * secs;
		obj.y += Math.sin(obj.heading) * obj.pps * secs;
		
        obj.points = starMod.create1({
                pointCount: obj.pointCount,
                radius: obj.r1,
                radiusInner: obj.r2,
                radianAjust: obj.heading
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
