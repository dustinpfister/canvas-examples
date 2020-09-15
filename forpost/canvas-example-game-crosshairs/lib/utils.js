// UTILS
var utils = {};
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// return a percent value from another percent value using Math.log
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};
// deep clone an object
utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}
