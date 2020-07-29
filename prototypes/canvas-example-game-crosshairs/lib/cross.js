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
                    y: 0
                }
            };
        },

        update: function (cross, secs) {
            secs = secs || 0;
            var ch = cross.crosshairs,
            center = cross.center;

            ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);

            // move back to innerRdaius if in outer area and userDown is false
            if (isInOuter(cross) && !cross.userDown) {
                ch.x += Math.cos(ch.heading) * cross.pps * secs;
                ch.y += Math.sin(ch.heading) * cross.pps * secs;
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
