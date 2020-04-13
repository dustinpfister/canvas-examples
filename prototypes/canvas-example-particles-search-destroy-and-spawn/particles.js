
var paricles = (function () {
    // random reading


    // Particle Class
    var Particle = function (opt) {
        opt = opt || {};
        this.x = opt.x || 0;
        this.y = opt.y || 0;
        this.heading = opt.heading || 0;
        this.pps = opt.pps || 32; // pixels per second
    };

    Particle.prototype.move = function (part) {};

    // public API
    return {
        create: function (opt) {

            var state = {
                canvas: opt.canvas,
                ctx: opt.ctx
            };

            return state;

        },
        update: function (state) {}
    }

}
    ());
