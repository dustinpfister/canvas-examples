gameMod.load({
    name: 'cookie',
    create: function(game, opt){
        game.forSections(function(section){
            section.cookie = {
                count: 0,
                rate: 1,
                max: 10
            };
        });
    },
    onDeltaYear: function(game, deltaYears){
        game.forSections(function(section){
            var cookie = section.cookie;
            cookie.count += cookie.rate * deltaYears;
            cookie.count = cookie.count > cookie.max ? cookie.max : cookie.count;
        });
    }
});