gradient.load({

    initMethods: {
        randomPos: function (obj, grad) {
            obj.x = grad.gridWidth * Math.random();
            obj.y = grad.gridHeight * Math.random();
        },
        randomColor: function (obj, grad, i) {
            var r = Math.random(),
            g = Math.random(),
            b = Math.random(),
            a = Math.random();
            obj.power = [r, g, b, a];
        },
        randomHeading: function (obj, grad, i) {
            var r = Math.PI * 2 * Math.random();
            obj.heading = r;
        },
        randomSpeed: function (obj, grad, i) {
            obj.cps = grad.MIN_CPS + (Math.random() * (grad.MAX_CPS - grad.MIN_CPS));
        },
        randomRadius: function (obj, grad, i) {
            obj.radius = grad.MIN_RADIUS + (Math.random() * (grad.MAX_RADIUS - grad.MIN_RADIUS));
        },
        // random
        random: function (obj, grad, i) {
            grad.initMethods.randomPos(obj, grad, i);
            grad.initMethods.randomColor(obj, grad, i);
            grad.initMethods.randomHeading(obj, grad, i);
            grad.initMethods.randomSpeed(obj, grad, i);
            grad.initMethods.randomRadius(obj, grad, i);
        }
    }

});
