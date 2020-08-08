var crossMod = (function () {

    var isInInner = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) < cross.radiusInner;
    };

    var isInOuter = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusInner;
    };

    var isOutOfBounds = function (cross) {
        var ch = cross.crosshairs,
        center = cross.center;
        return utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusOuter;
    };

    var moveOffset = function (cross, secs) {
        var ch = cross.crosshairs,
        center = cross.center,
        per = {
            min: 0.01,
            max: 1,
            current: 0.1
        },
        d = utils.distance(ch.x, ch.y, center.x, center.y) - cross.radiusInner;
        per.current = per.min + (per.max - per.min) * (d / cross.radiusDiff);
        cross.offset.x += Math.cos(ch.heading) * cross.offset.pps * per.current * secs;
        cross.offset.y += Math.sin(ch.heading) * cross.offset.pps * per.current * secs;
    };

    return {
        isInInner: isInInner,
        isInOuter: isInOuter,
        create: function (opt) {
            opt = opt || {};
            var cross = {
                userDown: false,
                moveBackEnabled: false,
                pps: opt.pps || 128,
                radiusInner: opt.radiusInner || (240 / 4),
                radiusOuter: opt.radiusOuter || (240 / 2.125),
                radiusDiff: 0,
                center: {
                    x: opt.cx || (320 / 2),
                    y: opt.cy || (240 / 2)
                },
                crosshairs: {
                    x: 320 / 2,
                    y: 240 / 2,
                    heading: 0,
                    radius: 16
                },
                offset: {
                    x: opt.offsetX || 0,
                    y: opt.offsetY || 0,
                    pps: 256
                }
            };
            cross.radiusDiff = cross.radiusOuter - cross.radiusInner;
            return cross;
        },

        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;
            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);

            // set bounds
            if (isOutOfBounds(cross)) {
                ch.x = center.x;
                ch.y = center.y;
                cross.userDown = false;
            }

            if (isInOuter(cross)) {
                // move back to innerRdaius if in outer area and userDown is false
                if (!cross.userDown && cross.moveBackEnabled) {
                    ch.x += Math.cos(ch.heading) * cross.pps * secs;
                    ch.y += Math.sin(ch.heading) * cross.pps * secs;
                }
                // apply changes to offset
                moveOffset(cross, secs);
            }
        },

        createEvent: function (cross, eventType) {
            return function (e) {
                var pos = utils.getCanvasRelative(e),
                ch = cross.crosshairs;
                //e.preventDefault();
                if (eventType === 'start') {
                    cross.userDown = true;
                    ch.x = pos.x;
                    ch.y = pos.y;
                }
                if (eventType === 'end') {
                    cross.userDown = false;
                }
                if (eventType === 'move') {
                    if (cross.userDown) {
                        ch.x = pos.x;
                        ch.y = pos.y;
                    }
                }
            };
        }

    }
}
    ());
