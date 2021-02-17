
var paricles = (function () {

    var DEFAULT_POOL_SIZE = 160,
    PARTICLE_MIN_RADIUS = 8,
    PARTICLE_MAX_RADIUS = 64,
    PARTICLE_MAX_LIFE = 3000;

    // random reading
    var randomHeading = function (min, max) {
        min = min === undefined ? 0 : min;
        max = max === undefined ? 359 : max;
        var degree = min + Math.random() * (max - min);
        return Math.PI / 180 * degree;
    };

    // Particle Class
    var Particle = function () {
        this.x = -1;
        this.y = -1;
        this.heading = 0;
        this.bits = '00'; // [0,0] inactive, [1,0] // blue, [0,1] red, [1,1] // explode
        this.pps = 32; // pixels per second
        this.life = PARTICLE_MAX_LIFE; // life left in milliseconds when in explode mode
        this.radius = PARTICLE_MIN_RADIUS;
        this.per = 1;
    };

    // Particle prototype methods for activating an deactivating a particle
    Particle.prototype.activate = function (side, canvas) {
        this.bits = side === 1 ? '10' : '01';
        this.x = canvas.width / 2;
        this.y = side === 1 ? 0 : canvas.height - 1;
        this.heading = side === 1 ? randomHeading(45, 135) : randomHeading(225, 315);
        this.pps = 32 + 128 * Math.random();
        this.life = PARTICLE_MAX_LIFE;
        this.radius = PARTICLE_MIN_RADIUS;
        this.per = 1;
    };
    Particle.prototype.deactivate = function () {
        this.bits = '00';
        this.x = -1;
        this.y = -1;
    };

    // create a particle pool
    var createPool = function () {
        var len = DEFAULT_POOL_SIZE,
        i = len,
        pool = [];
        while (i--) {
            pool.push(new Particle());
        }
        return pool;
    };

    // check if a particle has hit another
    var partHitCheck = function (state, part) {
        var i = state.pool.length,
        compare;
        if (part.bits === '11' || part.bits === '00') {
            return;
        }
        while (i--) {
            compare = state.pool[i];
            if (part === compare || compare.bits === '11' || compare.bits === part.bits || compare.bits === '00') {
                continue;
            }
            if (u.distance(part.x, part.y, compare.x, compare.y) <= 16) {
                part.bits = '11';
                part.pps = 0;
                part.x = (part.x + compare.x) / 2;
                part.y = (part.y + compare.y) / 2;
                compare.deactivate();
                break;
            }
        }
    };

    // spawn or activate particles
    var spawn = function (state, t) {
        state.lastSpawn += t;
        if (state.lastSpawn >= state.spawnRate) {
            state.lastSpawn = u.mod(state.lastSpawn, state.spawnRate);
            var i = state.pool.length;
            while (i--) {
                var part = state.pool[i];
                if (part.bits === '00') {
                    part.activate(state.nextSide, state.canvas);
                    state.nextSide = u.mod(state.nextSide + 1, 2);
                    break;
                }
            }
        }
    };

    // update a particle pool
    var updatePool = function (state, t) {
        var secs = t / 1000,
        i = state.pool.length,
        part;
        while (i--) {
            part = state.pool[i];
            if (part.bits === '10' || part.bits === '01') {
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                part.x = u.mod(part.x, state.canvas.width);
                part.y = u.mod(part.y, state.canvas.height);
                partHitCheck(state, part);
            }
            if (part.bits === '11') {
                part.per = 1 - part.life / PARTICLE_MAX_LIFE;
                var deltaRadius = (PARTICLE_MAX_RADIUS - PARTICLE_MIN_RADIUS) * part.per;
                part.radius = PARTICLE_MIN_RADIUS + deltaRadius;
                part.life -= t;
                if (part.life < 0) {
                    part.deactivate();
                }
            }
        }
    };
    
    // public API
    return {
        // create a state
        create: function (opt) {
            opt = opt || {};
            state = {
                canvas: opt.canvas || null,
                ctx: opt.ctx || null,
                pool: createPool(),
                lastTime: new Date(), // last Tick
                spawnRate: 60, // num of ms per spawn event
                lastSpawn: 0, // ms sense last spawn
                nextSide: 0
            };
            return state;
        },
        // update state
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000;
            // update pool, and spawn
            updatePool(state, t);
            spawn(state, t);
            // update last time
            state.lastTime = now;
        }
    }

}
    ());
