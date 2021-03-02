
var pool = (function(){

    var api = {};

    var colors = ['blue', 'red', 'white', 'green', 'lime', 'orange']
    var setColor = function(state, obj){
        obj.color = colors[Math.floor(Math.random() * colors.length)];
    };

    var setAlpha = function(state, obj){
        obj.alpha = 1 - obj.d / state.maxDist;
    };

    var setDistance = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        obj.d = utils.distance(obj.x, obj.y, cx, cy);
    };

    // appy bounds
    var bounds = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        if(obj.d > state.maxDist){
            var a = Math.atan(cy - obj.y, cx - obj.x);
            obj.x = cx + Math.cos(a) * ( state.maxDist - 10 );
            obj.y = cy + Math.sin(a) * ( state.maxDist - 10 );
            //obj.d = utils.distance(obj.x, obj.y, cx, cy);
            setDistance(state, obj);
        }
    };

    api.update = function (state, secs) {
        var i = state.pool.length,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        obj;
        while (i--) {
            obj = state.pool[i];
            // move by heading and pps
            obj.x += Math.cos(obj.heading) * obj.pps * secs;
            obj.y += Math.sin(obj.heading) * obj.pps * secs;
            setDistance(state, obj); // set distance
            bounds(state, obj);      // do a bounds check
            setAlpha(state, obj);     // set the alpha value
            obj.facing += Math.PI / 4 * secs;
            obj.facing %= Math.PI * 2;
            obj.points = starMod.create1({
                pointCount: obj.pointCount,
                radius: obj.r1,
                radiusInner: obj.r2,
                radianAjust: obj.heading
            });
        }
    };

    api.createState = function (opt) {
        opt = opt || {};
        var state = {
            maxDist: opt.maxDist || 50,
            canvas: opt.canvas,
            pool: []
        };
        var i = 0, star;
        while (i < 10) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                pointCount: 5 + Math.round(5 * Math.random()),
                r1: 30 + Math.round(20 * Math.random()),
                r2: 10 + Math.round(10 * Math.random()),
                heading: Math.PI * 2 * Math.random(),
                facing: 0,
                pps: 32,
                alpha: 1,
                color: 'blue',
                points: []
            };
            setColor(state, star);
            state.pool.push(star);
            pool.update(state, 0);
            i += 1;
        }
        return state;
    };

    return api;

}());
