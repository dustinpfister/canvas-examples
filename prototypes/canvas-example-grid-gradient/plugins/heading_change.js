gradient.load({

    objUpdaters: [
        // heading changes, fast speed
        function (grid, obj, secs) {
            obj.heading += Math.PI / 180 * 5 * secs;
            obj.heading = u.mod(obj.heading, Math.PI * 2);
            obj.cps = 15;
        }
    ]
});
