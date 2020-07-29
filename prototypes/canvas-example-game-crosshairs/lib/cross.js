var crossMod = (function () {

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
        d1 = utils.distance(ch.x, ch.y, center.x, center.y),
        diff = cross.radiusOuter - cross.radiusInner,
        d2 = d1 - cross.radiusInner,
        per = d2 / diff;
        if (d1 > cross.radiusInner) {
            cross.offset.x += Math.cos(ch.heading + Math.PI) * cross.offset.pps * per * secs;
            cross.offset.y += Math.sin(ch.heading + Math.PI) * cross.offset.pps * per * secs;
        }
    };

    return {
        create: function (canvas) {
            return {
                userDown: false,
                pps: 32,
                radiusInner: canvas.height / 4,
                radiusOuter: canvas.height / 2.125,
                center: {
                    x: canvas.width / 2,
                    y: canvas.height / 2
                },
                crosshairs: {
                    x: 0,
                    y: 0,
                    heading: 0,
                    radius: 16
                },
                offset: {
                    x: 0,
                    y: 0,
                    pps: 16
                }
            };
        },

        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;

            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);

            if (isInOuter(cross)) {
                // move back to innerRdaius if in outer area and userDown is false
                if (!cross.userDown) {
                    ch.x += Math.cos(ch.heading) * cross.pps * secs;
                    ch.y += Math.sin(ch.heading) * cross.pps * secs;
                }

                // apply changes to offset
                moveOffset(cross, secs);
            }

            if (isOutOfBounds(cross)) {
                ch.x = center.x + Math.cos(ch.heading + Math.PI) * cross.radiusOuter;
                ch.y = center.y + Math.sin(ch.heading + Math.PI) * cross.radiusOuter;
            }

        },

        createEvent: function (cross, eventType) {
            return function (e) {
                var pos = utils.getCanvasRelative(e);
                if (eventType === 'start') {
                    cross.userDown = true;
                }
                if (eventType === 'end') {
                    cross.userDown = false;
                }
                if (eventType === 'move' && cross.userDown) {
                    cross.crosshairs.x = pos.x;
                    cross.crosshairs.y = pos.y;
                }
            };
        }

    }
}
    ());
