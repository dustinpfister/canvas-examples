
var pool = (function(){

    var STAR_COUNT = 60,
    STAR_SIZE_MIN = 5,
    STAR_SIZE_MAX = 150,
    STAR_PPS_MIN = 64,
    STAR_PPS_MAX = 200;

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

    var setSize = function(state, obj){
        var per = 1 - obj.d / state.maxDist,
        maxDelta = STAR_SIZE_MAX - STAR_SIZE_MIN,
        delta1 = maxDelta * 0.25 + maxDelta * 0.75 * per,
        delta2 = maxDelta * 0.25 * per;
        //obj.r1 = 10 + 60 * per;
        //obj.r2 = 5 + 20 * per;
        obj.r1 = STAR_SIZE_MIN + delta1 * per;
        obj.r2 = STAR_SIZE_MIN + delta2 * per;
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
            setAlpha(state, obj);    // set the alpha value
            setSize(state, obj);     // set the size
            obj.facing += obj.facingDelta * secs;
            obj.facing = utils.mod(obj.facing, Math.PI * 2);
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
            ver: '0.1.0',
            maxDist: opt.maxDist || 50,
            canvas: opt.canvas,
            pool: []
        };
        var i = 0, star,
        len = opt.count || STAR_COUNT;
        while (i < len) {
            star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                pointCount: 5 + Math.round(5 * Math.random()),
                r1: STAR_SIZE_MAX,
                r2: STAR_SIZE_MIN,
                heading: Math.PI * 2 * Math.random(),
                facing: 0,
                facingDelta: -1 + 2 * Math.random(),
                pps: STAR_PPS_MIN + (STAR_PPS_MAX - STAR_PPS_MIN) * Math.random(),
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
