
var paricles = (function () {
    // random reading


    // Particle Class
    var Particle = function (opt) {
        opt = opt || {};
        this.x = opt.x || 0;
        this.y = opt.y || 0;
        this.radius = opt.radius || 10;
        this.heading = opt.heading || 0;
        this.pps = opt.pps || 16; // pixels per second
        this.type = opt.type || 'none';
        this.hpMax = opt.hpMax || 100;
        this.hp = this.hpMax;
        this.radiusAttack = 50;
        this.dps = 50;
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
        state.pool[0].type = 'hunter';
    };

    var poolMove = function (state, secs) {
        var i = state.pool.length,
        canvas = state.canvas,
        part;
        while (i--) {
            part = state.pool[i];
            part.move(secs);
            u.clamp(part, state.canvas);
            if (part.x === 0 || part.y === 0 || part.x === canvas.width - 1 || part.y === canvas.height - 1) {
                part.heading = u.perToRadian(Math.random());
            }
        }
    };

    var poolAttack = function (state, secs) {
        var hi = state.pool.length,
        hunter,
        i,
        part;
        while (hi--) {
            hunter = state.pool[hi];
            if (hunter.type === 'hunter') {
                i = state.pool.length;
                while (i--) {
                    part = state.pool[i];
                    if (part.type === 'hunter') {
                        continue;
                    }
                    if (u.distance(hunter.x, hunter.y, part.x, part.y) <= hunter.radiusAttack) {
                        part.hp -= hunter.dps * secs;
                        part.hp = part.hp < 0 ? 0 : part.hp;
                    }
                }
            }
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
            poolAttack(state, secs);
            state.lt = now;
        }
    }

}
    ());
