var crossMod = (function () {
    return {
        create: function (canvas) {
            return {
                userDown: false,
                pps: 32,
                radiusInner: canvas.height / 4,
                radiusOutter: canvas.height / 2.125,
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

            // move back to innerRdaius if in outer area and userDown is false
            if (utils.distance(ch.x, ch.y, center.x, center.y) >= cross.radiusInner && !cross.userDown) {
                ch.heading = Math.atan2(center.y - ch.y, center.x - ch.x);
                ch.x += Math.cos(ch.heading) * cross.pps * secs;
                ch.y += Math.sin(ch.heading) * cross.pps * secs;
            }

        },

    }
}
    ());
