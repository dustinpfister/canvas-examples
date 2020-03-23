// DISP BASE CLASS
var Disp = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 16 : opt.w;
    this.h = opt.h === undefined ? 16 : opt.h;
    this.heading = opt.heading === undefined ? 0 : opt.heading;
    this.pps = opt.pps === undefined ? 0 : opt.pps;

    // canvas
    this.canvas = opt.canvas || document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
};
// update method
Disp.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    this.moveObj(t);
    this.applyBounds(this, this.canvas);
};
// Base draw to a canvas method
Disp.prototype.draw = function () {
    var ctx = this.ctx,
    hw = this.w / 2,
    hh = this.h / 2;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.strokeRect(-hw, -hh, this.w, this.h);
    ctx.restore();
};
// apply canvas bounds
Disp.prototype.applyBounds = function () {
    var canvas = this.canvas;
    if (this.x < -this.w) {
        this.x = canvas.width + this.w - Math.abs(this.x) % (canvas.width + this.w);
    }
    if (this.x > canvas.width + this.w) {
        this.x = this.x % (canvas.width + this.w);
    }
    if (this.y < -this.h) {
        this.y = canvas.height + this.h - Math.abs(this.y) % (canvas.height + this.h);
    }
    if (this.y > canvas.height + this.h) {
        this.y = this.y % (canvas.height + this.h);
    }
};
// Move Disp Object by current heading and PPS
Disp.prototype.moveObj = function (t) {
    var s = t / 1000;
    var delta = this.pps * s;
    this.x += Math.cos(this.heading) * delta;
    this.y += Math.sin(this.heading) * delta;
};
// distance
Disp.prototype.distance = function (disp2) {
    return Math.sqrt(Math.pow(this.x - disp2.x, 2) + Math.pow(this.y - disp2.y, 2));
};



// SHOT CLASS
var Shot = function (opt) {
    opt = opt || {};
    // use Disp Base Constructor first
    Object.assign(this, new Disp(opt));
    // set Shot properties
    this.life = opt.life || 1000;
    this.damage = opt.damage === undefined ? 1 : opt.damage;
};
// inherit from Disp
Shot.prototype = new Disp();



// SHIP CLASS
var Ship = function (opt) {
    opt = opt || {};
    // use Disp Base Constructor first
    Object.assign(this, new Disp(opt));
    // Ship props
    this.shotMax = opt.shotMax === undefined ? 5 : opt.shotMax; ;
    this.shotLife = opt.shotLife === undefined ? 1500 : opt.shotLife;
    this.shotDelay = opt.shotDelay === undefined ? 350 : opt.shotDelay;
    this.shotPPS = opt.shotPPS === undefined ? 128 : opt.shotPPS;
    this.shotDamage = opt.shotDamage === undefined ? 1 : opt.shotDamage;
    this.maxHP = opt.maxHP === undefined ? 10 : opt.maxHP;
    // internals
    this.shots = [];
    this.shotTime = 0;
    this.HP = this.maxHP;
};
// inherit from Disp
Ship.prototype = new Disp();
// ship update
Ship.prototype.update = function (t, shipPool) {
    // apply Disp update first
    //console.log(this.x,this.y);
    Disp.prototype.update.call(this, t);
    //console.log(this.x,this.y);

    // update shots
    this.updateShots(t, shipPool);
};
// What happens when a Ship is hit
Ship.prototype.hit = function (shot) {
    this.HP -= shot.damage;
    this.HP = this.HP < 0 ? 0 : this.HP;
};
// update shots
Ship.prototype.updateShots = function (t, shipPool) {
    var s = t / 1000,
    ship = this;
    this.shotTime += t;
    // create new shots
    var newShots = this.shotTime / this.shotDelay;
    if (newShots >= 1) {
        this.shotTime = this.shotTime % this.shotDelay;
        if (this.shots.length < this.shotMax) {
            this.shots.push(new Shot({
                    canvas: this.canvas,
                    x: this.x,
                    y: this.y,
                    heading: this.heading,
                    pps: this.shotPPS,
                    life: this.shotLife,
                    damage: 1
                }));
        }
    }
    // update shots
    this.shots.forEach(function (shot) {
        shot.moveObj(t);
        shot.life -= t;
        shot.applyBounds();
        if (shipPool) {
            shipPool.forEach(function (ship) {
                if (ship.distance(shot) <= ship.w) {
                    ship.hit(shot);
                    shot.life = 0;
                }
            });
        }
    });
    // purge old shots
    var i = this.shots.length;
    while (i--) {
        var shot = this.shots[i];
        if (shot.life <= 0) {
            this.shots.splice(i, 1);
        }
    }
};
// draw The Ship to a canvas context
Ship.prototype.draw = function (ctx, shipStyle, shotStyle) {
    var hw = this.w / 2,
    hh = this.h / 2;
    // draw ship
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.strokeStyle = shipStyle || 'white';
    ctx.stroke();
    ctx.restore();
    // draw shots
    ctx.fillStyle = shotStyle || 'white';
    this.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
};
