var spinner = (function () {

    var PI2 = Math.PI * 2;

    // get current section value or object
    var get = function (spin) {
        var len = spin.sectionIndices.length,
        index = spin.sectionIndices[Math.floor(spin.radian / PI2 * len)];
        return spin.sections[index];
    };

    return {

        // create a spinner state object
        create: function (opt) {
            opt = opt || {};
            var spin = {
                ver: '0.0.0',
                cx: opt.cx === undefined ? 0 : opt.cx,
                cy: opt.cy === undefined ? 0 : opt.cy,
                RPS: {
                    current: 0,
                    start: [3, 8],
                    lossPerSecond: 2
                },
                radian: 0,
                sections: opt.sections || [1, 2, 3],
                sectionIndices: opt.sectionIndices || [0, 1, 0, 1, 2],
                currentSection: null
            };
            return spin;
        },

        // start spinning a spinner state object
        startSpin: function (spin) {
            var RPS = spin.RPS;
            RPS.current = RPS.start[0] + Math.random() * (RPS.start[1] - RPS.start[0]);
        },

        // update a spinner object
        update: function (spin, secs) {
            var RPS = spin.RPS;
            // just step by RPS times secs
            spin.radian += RPS.current * secs;
            spin.radian %= PI2;
            RPS.current -= RPS.lossPerSecond * secs;
            RPS.current = RPS.current < 0 ? 0 : RPS.current;
            spin.currentSection = get(spin);
        }

    }

}
    ());
