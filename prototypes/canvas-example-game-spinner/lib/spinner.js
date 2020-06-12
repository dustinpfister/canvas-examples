var spinner = (function () {

    var PI2 = Math.PI * 2;

    var createSectionObject = function (opt) {
        return {
            background: opt.background || 'green',
            value: opt.value === undefined ? null : opt.value
        };
    };

    var createSections = function (opt) {
        var sections = [];
        return sections;
    };

    return {

        // create a spinner state object
        create: function (opt) {
            opt = opt || {};
            var spin = {
                cx: opt.cx === undefined ? 0 : opt.cx,
                cy: opt.cy === undefined ? 0 : opt.cy,
                RPS: {
                    current: 0,
                    start: [3,8],
                    lossPerSecond: 2
                },
                radian: 0,
                sections: [],
                sectionIndices: [0, 1, 0, 1, 2]
            };
            spin.sections = createSections(opt);
            return spin;
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
            RPS.current = RPS.start[0] + Math.random() * (RPS.start[1] - RPS.start[0]);
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
