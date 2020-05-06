var clockMod = (function () {
    // pad a value
    var pad = function (a) {
        return String('00' + a).slice(-2);
    };

    return {
        create: function (date) {
            var c = {};
            c.now = date || new Date(0);
            c.timeText = pad(c.now.getHours()) + ' : ' + pad(c.now.getMinutes()) + ' : ' + pad(c.now.getSeconds());
            var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
            c.dayPer = (c.now - dayStart) / 86400000;
            return c;
        }
    }

}
    ());
