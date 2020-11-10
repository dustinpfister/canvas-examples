gameMod.load({
    name: 'cookie',
    create: function(game, opt){
        game.forSections(function(section){
            section.cookies = {
                count: 0,
                rate: 1
            };
        });
    },
    onDeltaYear: function(game, deltaYears){
        
    }
});