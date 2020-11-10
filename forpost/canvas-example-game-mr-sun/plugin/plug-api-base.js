gameMod.load({
    name: 'plug-api-base',
    create: function(game, opt){
        game.forSections = function(forEach){
            var i = 0,
            len = game.sections.length;
            while(i < len){
                section = game.sections[i];
                forEach.call(game, section, i, game);
                i += 1;
            }
        }
    },
    onDeltaYear: function(game, deltaYears){
        
    }
});