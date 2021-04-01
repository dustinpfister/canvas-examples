var pool = (function(){
    // public API
    var api = {};
    // set color
    var colors = ['blue', 'red', 'white', 'green', 'lime', 'orange']
    var setColor = function(state, obj){
        obj.color = colors[Math.floor(Math.random() * colors.length)];
    };
    // set alpha
    var setAlpha = function(state, obj){
        obj.alpha = 1 - obj.d / state.maxDist;
    };
    // set the distance between a star and the center
    var setDistance = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        obj.d = utils.distance(obj.x, obj.y, cx, cy);
    };
    // set the size of a star
    var setSize = function(state, obj){
        var per = 1 - obj.d / state.maxDist,
        maxDelta = state.starSizeMax - state.starSizeMin,
        delta1 = maxDelta * 0.25 + maxDelta * 0.75 * per,
        delta2 = maxDelta * 0.25 * per;
        obj.r1 = state.starSizeMin + delta1 * per;
        obj.r2 = state.starSizeMin + delta2 * per;
    };
    // appy bounds
    var bounds = function(state, obj){
        var cx = state.canvas.width / 2,
        cy = state.canvas.height / 2;
        if(obj.d > state.maxDist){
            var a = Math.atan(cy - obj.y, cx - obj.x);
            obj.x = cx + Math.cos(a) * ( state.maxDist - 10 );
            obj.y = cy + Math.sin(a) * ( state.maxDist - 10 );
            setDistance(state, obj);
        }
    };
    // update a state object
    var willUpdate = function(state, obj){
        if(state.selected){
            return !(state.selected.i === obj.i);
        }
        return true;
    };
    api.update = function (state, secs) {
        var i = state.pool.length,
        cx = state.canvas.width / 2,
        cy = state.canvas.height / 2,
        obj;
        while (i--) {
            obj = state.pool[i];
            if(willUpdate(state, obj)){
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
        }
    };
    // create a state object
    api.createState = function (opt) {
        opt = opt || {};
        var state = {
            ver: opt.ver || '0.0.0',
            debugMode: false,
            count: opt.count || 5,
            starPPSMax: opt.starPPSMax || 64,
            starPPSMin: opt.starPPSMin || 32,
            starSizeMax: opt.starSizeMax || 20,
            starSizeMin: opt.starSizeMin || 10,
            maxDist: opt.maxDist || 50,
            canvas: opt.canvas,
            pool: [],
            selected: null // ref to a selected object or null
        };
        var i = 0, star,
        len = state.count;
        while (i < len) {
            star = {
                i: i,
                x: state.canvas.width * Math.random(),
                y: state.canvas.height * Math.random(),
                pointCount: 5 + Math.round(15 * Math.random()),
                r1: state.starSizeMax,
                r2: state.starSizeMin,
                heading: Math.PI * 2 * Math.random(),
                facing: 0,
                facingDelta: -1 + 2 * Math.random(),
                pps: state.starPPSMin + (state.starPPSMax - state.starPPSMin) * Math.random(),
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
    // get an object at pos or flase if nothing
    api.getObjectAtPos = function(state, x, y){
        var i = state.pool.length,
        obj;
        while(i--){
            obj = state.pool[i];
            if(utils.distance(x,y,obj.x,obj.y) <= obj.r1){
                return obj
            }
        }
        return false;
    };
    // return the public api
    return api;
}());
