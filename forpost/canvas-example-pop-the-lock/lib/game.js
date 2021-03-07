// STATE
var ptl = {
    ver: '0.1.0',
    sec_current: 0,
    sec_target: 4,
    sec_total: 100,
    sec_margin: 4,
    tick_dir: -1,
    tick_rate: 30,
    tick_last: new Date(),
    inRange: false,
    score: 0,
    // wrap a sec value
    wrapSec: function (sec) {
        if (sec > this.sec_total) {
            sec %= this.sec_total;
        }
        if (sec < 0) {
            sec = this.sec_total - (this.sec_total + Math.abs(sec)) % this.sec_total;
        }
        return sec;
    },
    // get in range boolean
    getInRange: function () {
        return this.sec_current >= this.sec_target - this.sec_margin && this.sec_current <= this.sec_target + this.sec_margin;
    },
    // user clicked to touched the canvas
    click: function (e) {
        ptl.score += ptl.inRange ? 1 : -1;
        if (ptl.inRange) {
            ptl.tick_dir = ptl.tick_dir === 1 ? -1 : 1;
            ptl.randomTarget();
        }
    },
    randomTarget: function () {
        this.sec_target = Math.floor(Math.random() * (this.sec_total - this.sec_margin * 2)) + this.sec_margin;
    },
    // tick
    tick: function () {
        var time = new Date() - this.tick_last,
        ticks = time / this.tick_rate;
        this.sec_current += ticks * this.tick_dir;
        this.sec_current = this.wrapSec(this.sec_current);
        this.inRange = this.getInRange();
        this.tick_last = new Date();
    }
};
