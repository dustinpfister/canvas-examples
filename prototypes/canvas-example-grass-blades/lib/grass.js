
var Grass = (function () {

    // public API
    return {
        // create a state
        create: function (opt) {
            opt = opt || {};
            return {
                maxBlades: opt.maxBlades || 10,
                t: 0,
                blades: []
            };
        }

    }

}
    ());
