gameMod.load({
    name: 'jar',
    callPriority: 2.2,
    create: function (game, opt) {
        console.log(this.name);
        game.jar = {
            count: 0
        };
    },
    onDeltaYear: function (game, deltaYears) {
        game.sun.text = game.jar.count;
        game.forSections(function (section) {
            // take all
            if (section.per >= 0.98) {
                game.jar.count += section.cookie.count;
                game.sun.points = game.jar.count;
                section.cookie.count = 0;
            }
        });
    }
});
