gradient.load({
    objUpdaters: {
        // heading changes, fast speed
        headingChange: function (grid, obj, secs) {
            //obj.power = [0, 0, 1];
            obj.heading += Math.PI / 180 * 5 * secs;
            obj.heading = u.mod(obj.heading, Math.PI * 2);
            obj.cps = 15;
        }
    }
});
