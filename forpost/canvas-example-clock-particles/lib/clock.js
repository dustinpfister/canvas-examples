var clockMod = (function () {

    var getTimeText = function (clock) {
        return u.pad(clock.now.getHours()) + ' : ' +
        u.pad(clock.now.getMinutes()) + ' : ' +
        u.pad(clock.now.getSeconds());
    };

    var getDayStart = function (clock) {
        return new Date(clock.now.getFullYear(), clock.now.getMonth(), clock.now.getDate(), 0, 0, 0, 0)
    };

    var setPart = function (clock, part) {
        var weekPer = (clock.now.getDay() + 1) / 7,
        baseSpeed = 16 + 32 * weekPer,
        deltaSpeed = 96 * weekPer * Math.random();
        part.pps = baseSpeed + deltaSpeed;
        part.heading = Math.PI * 2 * Math.random();
    };

    var createPool = function (clock, count) {
        var i = 0,
        pool = [],
        part;
        while (i < count) {
            part = {
                i: i,
                x: 0,
                y: 0,
                pps: 0,
                heading: 0,
                active: false
            };
            setPart(clock, part);
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

    var updatePool = function (clock, secs) {
        var i = clock.pool.length,
        part;
        while (i--) {
            part = clock.pool[i];
            if (part.active) {
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                if (u.distance(part.x, part.y, 0, 0) >= clock.faceRadius) {
                    part.x = 0;
                    part.y = 0;
                    setPart(clock, part);
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
            clock.ver = '0.0.0';
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            clock.pool = createPool(clock, 240);
            clock.poolLastTick = now;
            clock.poolTotalActive = 0;
            clock.faceRadius = 100;
            return clock;
        },

        update: function (clock, now) {
            //clock.now = new Date(2020, 4, 9, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            var t = clock.now - clock.poolLastTick,
            secs = t / 1000;
            setActivePoolParts(clock);
            updatePool(clock, secs);
            clock.poolLastTick = clock.now;
            return clock;
        }
    }

}
    ());
