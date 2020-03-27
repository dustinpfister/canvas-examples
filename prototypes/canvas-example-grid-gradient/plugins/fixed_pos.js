gradient.load({

    objUpdaters: [
        // fixed position
        function (grid, obj, secs) {
            //obj.power = [0, 1, 0];
            obj.cps = 0;
        }
    ]
});
