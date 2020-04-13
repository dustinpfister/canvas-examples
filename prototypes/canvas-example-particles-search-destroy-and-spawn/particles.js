
var paricles = (function () {
    // random reading


    // Particle Class
    var Particle = function (opt) {
        opt = opt || {};
        this.x = opt.x || 0;
        this.y = opt.y || 0;
        this.radius = opt.radius || 10;
        this.heading = opt.heading || 0;
        this.pps = opt.pps || 32; // pixels per second
        this.type = 'none';
    };

    Particle.prototype.move = function (secs) {
        this.x += Math.cos(this.heading) * this.pps * secs;
        this.y += Math.sin(this.heading) * this.pps * secs;
    };

    // create a pool of particles
    var createPool = function (state) {
        var i = 0,
        canvas = state.canvas;
        state.pool = [];
        while (i < 10) {
            state.pool.push(new Particle({
                    x: canvas.width * Math.random(),
                    y: canvas.height * Math.random(),
                    heading: Math.PI * 2 * Math.random()
                }));
            i += 1;
        }
    };

    var poolMove = function (state, secs) {
        var i = state.pool.length,
        part;
        while (i--) {
            part = state.pool[i];
            part.move(secs);
            u.clamp(part, state.canvas);
        }
    };

    // public API
    return {
        create: function (opt) {
            var state = {
                canvas: opt.canvas,
                ctx: opt.ctx,
                lt: new Date(),
                pool: []
            };
            createPool(state);
            return state;
        },
        update: function (state) {

            var now = new Date(),
            t = now - state.lt,
            secs = t / 1000;

            poolMove(state, secs);

            state.lt = now;

        }
    }

}
    ());
