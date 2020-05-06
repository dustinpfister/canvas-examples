var clockMod = (function () {
    // pad a value
    var pad = function (a) {
        return String('00' + a).slice(-2);
    };

    var getTimeText = function (clock) {
        return pad(clock.now.getHours()) + ' : ' +
        pad(clock.now.getMinutes()) + ' : ' +
        pad(clock.now.getSeconds());
    };

    var getDayStart = function (clock) {
        return new Date(clock.now.getFullYear(), clock.now.getMonth(), clock.now.getDate(), 0, 0, 0, 0)
    };

    var createPool = function (count) {
        var i = 0,
        pool = [],
        part;
        while (i < count) {
            part = {
                i: i,
                x: 0,
                y: 0,
                pps: 16 + 16 * Math.random(),
                heading: Math.PI * 2 * Math.random(),
                active: false
            };
            pool.push(part);
            i += 1;
        }
        return pool;
    };

    var setActivePoolParts = function (clock) {
        var len = clock.pool.length,
        i = len,
        part;
        clock.poolTotalActive = Math.floor(len * (1 - Math.abs(0.5 - clock.dayPer) / 0.5));
        while (i--) {
            part = clock.pool[i];
            part.active = false;
            if (part.i <= clock.poolTotalActive) {
                part.active = true;
            }
        }
    };

    var movePool = function (clock, secs) {
        var i = clock.pool.length,
        part;
        while (i--) {
            part = clock.pool[i];
            if (part.active) {
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                if (u.distance(part.x, part.y, 0, 0) >= 80) {
                    part.x = 0;
                    part.y = 0;
                }
            }
        }
    };

    var setClockPropsToNow = function (clock) {
        clock.timeText = getTimeText(clock);
        var dayStart = getDayStart(clock);
        clock.dayPer = (clock.now - dayStart) / 86400000;
        clock.secPer = clock.now.getMilliseconds() / 1000;
    };

    // return a public method that creates a clock object
    return {
        create: function (now) {
            var clock = {};
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            clock.pool = createPool(100);
            clock.poolLastTick = now;
            clock.poolTotalActive = 0;
            return clock;
        },

        update: function (clock, now) {
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);

            var t = clock.now - clock.poolLastTick,
            secs = t / 1000;
            setActivePoolParts(clock);
            movePool(clock, secs);
            clock.poolLastTick = clock.now;
            return clock;
        }
    }

}
    ());
