var XP = (function () {

    // set level with given xp
    var set = function (xp) {
        return Math.sqrt(xp);
    };
    // get exp to the given level with given current_level and xp
    var XPto =  function (level) {
        return Math.pow(level, 2);
    };

    return {
        set: function (xp) {

            return Math.floor(set(xp));

        },

        XPto: function (level) {
            return XPto(level);
        }

    };

}
    ());

var xp = XP.XPto(10);
console.log(XP.set(xp)); // level 10
console.log(xp); // 100 XP
