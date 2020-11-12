// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load((function () {

        // constants
        var LEVEL_CAP = 100,
        DELTA_NEXT = 50,
        XP_PER_YEAR = 1;

        // XP SYSTEM
        var XP = (function () {
            var DEFAULTS = {
                level: 1,
                xp: 0,
                cap: 30,
                deltaNext: 50
            };
            // set level with given xp
            var set = function (xp, deltaNext) {
                return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
            };
            // get exp to the given level with given current_level and xp
            var getXPtoLevel = function (level, deltaNext) {
                return ((Math.pow(level, 2) - level) * deltaNext) / 2;
            };
            var parseByXP = function (xp, cap, deltaNext) {
                xp = xp === undefined ? DEFAULTS.xp : xp;
                cap = cap === undefined ? DEFAULTS.cap : cap;
                deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
                var l = set(xp, deltaNext);
                l = l > cap ? cap : l;
                var level = Math.floor(l),
                forNext = getXPtoLevel(level + 1, deltaNext);
                forNext = l === cap ? Infinity : forNext;
                var toNext = l === cap ? Infinity : forNext - xp;
                var forLast = getXPtoLevel(level, deltaNext);
                return {
                    level: level,
                    levelFrac: l,
                    xp: xp,
                    per: (xp - forLast) / (forNext - forLast),
                    forNext: forNext,
                    toNext: toNext,
                    forLast: forLast
                };
            };
            return {
                parseByLevel: function (l, cap, deltaNext) {
                    l = l === undefined ? DEFAULTS.level : l;
                    deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
                    var xp = getXPtoLevel(l, deltaNext);
                    console.log(xp);
                    return parseByXP(xp, cap, deltaNext);
                },
                parseByXP: parseByXP
            };
        }
            ());

        var setSunLevel = function (sun) {
            sun.xp = sun.years * XP_PER_YEAR + sun.points;
            sun.levelObj = XP.parseByXP(sun.xp, LEVEL_CAP, DELTA_NEXT);
        };

        return {
            name: 'sun',
            callPriority: '1.1',
            create: function (game, opt) {
                console.log(this.name);
                var sun = game.sun;

                // add Points method
                sun.addPoints = function (points) {
                    sun.points += 1;
                };

                // reset sun method
                sun.reset = function () {
                    sun.points = 0;
                    sun.years = 0;
                    sun.exp = 0;
                    sun.levelObj = {};
                };
                sun.reset();
                setSunLevel(sun);
            },
            onDeltaYear: function (game, deltaYears) {
                var sun = game.sun;
                sun.years += deltaYears;
                sun.exp = sun.years + sun.points;
                setSunLevel(sun);
            }
        };

    }
        ()));
