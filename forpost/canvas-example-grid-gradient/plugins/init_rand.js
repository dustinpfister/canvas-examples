gradient.load({

    initMethods: {
        randomPos: function (obj, grad) {
            obj.x = grad.gridWidth * Math.random();
            obj.y = grad.gridHeight * Math.random();
        },
        randomColor: function (obj, grad, i) {
            var r = Math.random(),
            g = Math.random(),
            b = Math.random();
            obj.power = [r, g, b, 1];
        },
        randomHeading: function (obj, grad, i) {
            var r = Math.PI * 2 * Math.random();
            obj.heading = r;
        },
        randomSpeed: function (obj, grad, i) {
            obj.cps = grad.MIN_CPS + (Math.random() * (grad.MAX_CPS - grad.MIN_CPS));
        },
        // random
        random: function (obj, grad, i) {
            grad.initMethods.randomPos(obj, grad, i);
            grad.initMethods.randomColor(obj, grad, i);
            grad.initMethods.randomHeading(obj, grad, i);
            grad.initMethods.randomSpeed(obj, grad, i);
        }
    }

});
