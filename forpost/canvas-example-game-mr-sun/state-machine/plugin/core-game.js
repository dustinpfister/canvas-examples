stateMod.load({
    name: 'core-game',
    type: 'plugin',
    create: function (sm) {
        // setup game object
        sm.game = gameMod.create({
            canvas: sm.canvas,
            sectionCount: 19,
            worldRadius: 100,
            yearRate: 0.25,
            year: 0
        });
    }
});
