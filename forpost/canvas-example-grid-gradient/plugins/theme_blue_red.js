gradient.load({

    initMethods: {
        br: function (obj, grad) {
            obj.x = grad.gridWidth / 2;
            obj.y = grad.gridHeight / 2;
            obj.heading = Math.PI * 2 * Math.random();
            obj.radius = 3;
            obj.cps = 1 * 3 * Math.random();
        },
    },

    objUpdaters: {
        br: function (grad, obj, secs) {
            var r = 1,
            b = 0;
            if (obj.i % 2 === 0) {
                r = 0;
                b = 1;
            }
            obj.power = [r, 0, b, 1];
        }
    }

});
