
var clock = {};

// get basic values with the given t value in milliseconds
clock.getBasicValues = function (t) {
    t = t === undefined ? 0 : t;
    t = t < 0 ? 0 : t;
    var sec = t / 1000;
    return {
        t: t,
        sec: sec,
        days: sec / 86400,
    }
};

// get percent done based on days over max days
/*
clock.getPercent = function (days, max) {
days = days || 0;
max = max || (3 * Math.pow(10, 4));
var per = days / max;
per = per > 1 ? 1 : per;
per = per < 0 ? 0 : per;
return per;
}
 */

// figure money based on days
clock.figMoney = function (days, rates) {
    days = days || 0;
    rates = rates || [{
                min: 0,
                perDay: 1
            }, {
                min: 500,
                perDay: 2
            }, {
                min: 3000,
                perDay: 3
            }, {
                min: 10000,
                perDay: 6
            }
        ];
    var pastDays = Math.floor(days),
    currentDay = days % pastDays;

    var money = 0,
    cr = 0;
    rates.forEach(function (rate) {
        var d = pastDays - rate.min;
        cr += rate.perDay;
        if (d > 0) {
            money += d * rate.perDay;
        }
    });

    return money + currentDay * cr;

};

// get a clock object
clock.get = function (now, start) {
    var c = {};
    c.now = now || new Date(2000, 3, 6, 10, 5);
    c.start = start || new Date(1983, 3, 6, 0, 0);

    // get basic values
    c = Object.assign(c, clock.getBasicValues(c.now - c.start));

    //c.per = clock.getPercent(c.days);

    c.money = clock.figMoney(c.days)
    c.timeText = c.money.toFixed(2);
    //c.timeText = clock.figMoney(c.days).toFixed(2) + ' ' + c.days.toFixed(2);

    return c;
};
