
var Percent = (function () {

    // main api function
    var api = function (n, d, methodKey, args) {
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n, d].concat(args));
    };
    // CLAMP
    var clamp = function (per) {
        if (per > 1) {
            return 1;
        }
        if (per < 0) {
            return 0;
        }
        return per;
    };

    // createPerObject helper
    var createPerObject = function(args, per){
        return {
            basicPer: api.basicPer(args[0], args[1]),
            per: per,
            n: args[0],
            d: args[1],
            args: [].slice.call(args, 2, args.length),
            valueOf : function(){
                return this.per;
            }
        };
    }

    // BASICS
    // base percent function
    api.basicPer = function (n, d) {
        return arguments, clamp(n / d);
    };
    // 'bias' percent function
    api.bias = function (n, d) {
        var per = api.basicPer(n, d);
        return createPerObject(arguments, clamp(1 - Math.abs(per - 0.5) / 0.5) );
    };
    // MATH.LOG
    // 'log1' percent method that uses Math.log
    api.log1 = function (n, d) {
        var per = api.basicPer(n, d);
        return createPerObject(arguments, clamp(Math.log(1 + per) / Math.log(2)) );
    };
    // 'log2' percent method that uses Math.log with a range between a base and max per
    api.log2 = function (n, d, basePer, maxPer) {
        basePer = basePer === undefined ? 0.25 : basePer;
        maxPer = maxPer === undefined ? 0.75 : maxPer;
        var logPer = api.log1(n, d),
        range = maxPer - basePer,
        per = basePer + range * logPer;
        return createPerObject(arguments, clamp(per) );
    };
    // 'log3' percent method that takes a value a that has an interesting effect on the curve
    api.log3 = function (n, d, a, basePer, maxPer) {
        basePer = basePer === undefined ? 0.10 : basePer;
        maxPer = maxPer === undefined ? 1 : maxPer;
        a = a === undefined ? 12 : a;
        var per = api.basicPer(n, d),
        per2 = clamp(Math.log(1 + per) / Math.log(2 + a)),
        range = maxPer - basePer;
        return createPerObject(arguments, clamp(basePer + range * per2) );
    };
    // log4
    api.log4 = function (n, d, a, basePer, maxPer) {
        basePer = basePer === undefined ? 0.10 : basePer;
        maxPer = maxPer === undefined ? 1 : maxPer;
        a = a === undefined ? 12 : a;
        var per = api.basicPer(n, d);
        return createPerObject(arguments, clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per)));
    };
    // MATH.COS AND MATH.SIN
    // Trig helper method
    var trig = function (n, d, method, waves, radianOffset, invert) {
        method = method === undefined ? 'cos' : method;
        waves = waves === undefined ? 1 : waves;
        radianOffset = radianOffset === undefined ? 0 : radianOffset;
        invert = invert === undefined ? false : true;
        var per = api.basicPer(n, d),
        a = Math.PI * 2 * per / (1 / waves) + radianOffset,
        cos = (Math[method](a) * 0.5 + 0.5);
        return invert ? cos : 1 - cos;
    };
    // cos, and sin method
    api.cos = function (n, d, waves, radianOffset, invert) {
        return createPerObject(arguments, trig(n, d, 'cos', waves, radianOffset, invert));
    };
    api.sin = function (n, d, waves, radianOffset, invert) {
        return createPerObject(arguments, trig(n, d, 'sin', waves, radianOffset, invert));
    };
    api.waves = function (n, d, waves, radianOffset, invert, method) {
        waves = waves === undefined ? 5 : waves;
        return createPerObject(arguments, trig(n, d, method, waves, radianOffset, invert));
    };
    // return public API
    return api;
}
    ());
