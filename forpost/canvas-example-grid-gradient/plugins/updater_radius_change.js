gradient.load({
    objUpdaters: {
        // radius changes, slow speed
        radiusGrow: function (grid, obj, secs) {
            if (obj.radius === 3 || obj.radius === 10) {
                var roll = Math.floor(Math.random() * 50) + 1;
                if (roll === 1) {
                    obj.radiusDir = obj.radiusDir === 1 ? -1 : 1;
                }
            }
            obj.radius += 1 * secs * obj.radiusDir;
            obj.radius = obj.radius < 3 ? 3 : obj.radius;
            obj.radius = obj.radius > 10 ? 10 : obj.radius;
            obj.cps = 3;
        }
    }
});
