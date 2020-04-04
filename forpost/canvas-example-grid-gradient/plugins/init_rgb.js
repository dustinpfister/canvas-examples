gradient.load({

    initMethods: {
        //updatersStager: function (obj, grad, i) {
        //    obj.objUpdaterIndex = u.mod(i, grad.objUpdaters.length);
        //},
        rgb: function (obj, grad, i) {
            // cycle r,g,b color power
            var rand = Math.random() * 0.75 + 0.25,
            r = rand,
            g = 0,
            b = 0;
            if (u.mod(i, 2) === 0) {
                r = 0;
                g = 0;
                b = rand;
            }
            if (u.mod(i, 3) === 0) {
                r = 0;
                g = rand;
                b = 0;
            }
            obj.power = [r, g, b, 1];
        }
    }

});
