var u = {
    defaultAngleScale: Math.PI * 2
};

// mathematical modulo
u.mod = function (x, m) {
    return (x % m + m) % m;
};

u.normalizeHalf = function (n, scale) {
    var c = scale || u.defaultAngleScale,
    h = c / 2;
    return u.mod(n + h, c) - h;
};

// distance
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// the angular distance between two angles
u.angleDistance = function (a, b, scale) {
    var m = scale || u.defaultAngleScale,
    h = m / 2,
    diff = u.normalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};

// get the angle from one point to another
u.getAngleToPoint = function (pt1, pt2) {
    return u.normalizeHalf(Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x));
};

// get -1, 1, or 0 depending on the the state of two angles
u.shortestAngleDirection = function (a1, a2) {
    var z = a1 - a2,
    x = u.normalizeHalf(z);
    if (x < 0) {
        return -1; // Left
    }
    if (x > 0) {
        return 1; // Right
    }
    // if a1 === a2 or any other case
    return 0;
};
