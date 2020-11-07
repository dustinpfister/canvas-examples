// geo.js plug-in
gameMod.load({
    name: 'geo',
    callPriority: '2',
    create: function (game, opt) {
        game.geoData = {
            totalMass: 0
        };
    },
    onDeltaYear: function (game, deltaYears) {}
});
