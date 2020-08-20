// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var weapons = [
    // 0
    {
        maxDPS: null,
        level: {
            maxDPS_start: 10,
            maxDPS_perLevel: 5,
            maxDPS_baseStart: 1.0125,
            maxDPS_baseSPDelta: 0.05
        }
    },
    // 1
    {
        maxDPS: null,
        level: {
            maxDPS_start: 10,
            maxDPS_perLevel: 5,
            maxDPS_baseStart: 1.0125,
            maxDPS_baseSPDelta: 0.05
        }
    }
];

// SKILL POINTS
var createDPSObject = function (level, weaponObj, sp) {
    var wepLV = weaponObj.level;
    return {
        i: level,
        start: wepLV.maxDPS_base,
        lin: wepLV.maxDPS_perLevel,
        baseStart: wepLV.maxDPS_baseStart,
        baseSPDelta: wepLV.maxDPS_baseSPDelta,
        sp: sp, // skill points
        valueOf: function () {
            var base = this.baseStart + (1 - 1 / (1 + this.sp)) * this.baseSPDelta;
            return this.start + this.i * this.lin + Math.pow(base, this.i);
        }
    };
};

weapons.forEach(function (weapon) {

    weapon.maxDPS = createDPSObject(1, weapon, 0);

})

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);

};

loop();
