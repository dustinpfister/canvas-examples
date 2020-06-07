var spinner = (function () {

    var PI2 = Math.PI * 2;

    return {

        // create a spinner state object
        create: function (opt) {
            opt = opt || {};
            return {
                cx: opt.x === undefined ? 0: opt.x,
                cy: opt.y === undefined ? 0: opt.y,
                RPS: {
                    current: 0,
                    start: 6,
                    lossPerSecond: 1
                },
                radian: 0,
                sections: [1, 2, 3, 4, 5],
                sectionIndices: [0, 1, 2, 3, 4]
            }
        },

        // get current section value or object
        get: function (spin) {
            var len = sectionIndices.length,
            index = Math.floor(spin.radian / PI2 * len);
            return spin.sections[index];
        },

        // start spinning a spinner state object
        startSpin: function (spin) {
            var RPS = spin.RPS;
            RPS.current = RPS.start;
        },

        update: function (spin, secs) {
            var RPS = spin.RPS;
            // just step by RPS times secs
            spin.radian += RPS.current * secs;
            RPS.current -= RPS.lossPerSecond * secs;
            RPS.current = RPS.current < 0 ? 0 : RPS.current;
        }

    }

}
    ());
