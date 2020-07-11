var Unit = (function () {

    var createBaseUnit = function (opt) {

        opt = opt || {};

        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h,
        };

    };

    return {

        create: function () {}

    };

});
