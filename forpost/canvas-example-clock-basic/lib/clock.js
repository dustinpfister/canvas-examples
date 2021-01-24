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

    // return a public method that creates a clock object
    return {
        create: function (date) {
            var clock = {
                ver: '0.2.0'
            };
            clock.now = date || new Date(0);
            clock.timeText = getTimeText(clock);
            var dayStart = getDayStart(clock);
            clock.dayPer = (clock.now - dayStart) / 86400000;
            clock.secPer = clock.now.getMilliseconds() / 1000;
            clock.minPer = clock.now.getSeconds() / 60;
            clock.hourPer = clock.now.getMinutes() / 60;
            clock.AMPMPer = clock.now.getHours() % 12 / 12;
            return clock;
        }
    }

}
    ());
