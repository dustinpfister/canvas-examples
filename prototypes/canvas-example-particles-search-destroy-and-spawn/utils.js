// UTILS
var u = {};

u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
u.mod = function mod(x, m) {
    return (x % m + m) % m;
};

// clamp the given object to the given world
u.clamp = function (obj, world) {
    if (obj.x < 0) {
        obj.x = 0;
    }
    if (obj.y < 0) {
        obj.y = 0;
    }
    if (obj.x >= world.width) {
        obj.x = world.width - 1;
    }
    if (obj.y >= world.height) {
        obj.y = world.height - 1;
    }
};

// percent to radian
u.perToRadian = function (per) {
    return Math.PI * 2 * per;
};
