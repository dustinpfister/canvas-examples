// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
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
    }
];

// SKILL POINTS
var createDPSObject = function (level, weaponObj, sp) {
    var wepLV = weaponObj.level;
    return {
        i: level,
        start: wepLV.maxDPS_start,
        lin: wepLV.maxDPS_perLevel,
        baseStart: wepLV.maxDPS_baseStart,
        baseSPDelta: wepLV.maxDPS_baseSPDelta,
        sp: sp, // skill points
        valueOf: function () {
            var decay = (1 - 1 / (1 + this.sp)),
            baseSP = Math.pow(this.baseStart + decay * this.baseSPDelta, this.sp * decay),
            linSP = this.sp * this.lin,
            linLevel = level * this.lin;
            return (1 - decay); //this.start + (linSP + baseSP + linLevel) * decay;
        }
    };
};

var level = 1,
levelCap = 10,
dpsValues = [];
while (level < levelCap) {
    weapons.forEach(function (weapon) {
        weapon.maxDPS = createDPSObject(level, weapon, 10000);
        dpsValues.push(Number(weapon.maxDPS));
    });
    level += 1;
}
var dpsMax = Math.max.apply(dpsValues);
console.log(dpsValues);

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);

};

loop();
