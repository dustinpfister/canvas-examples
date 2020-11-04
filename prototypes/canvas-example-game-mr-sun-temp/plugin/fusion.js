gameMod.load({
    name: 'fusion',
    callPriority: '1.1',
    create: function(game, opt){
        game.sections = game.sections.map((section)=>{
            section.minerals = {
                copper: 0, 
                gold: 0 
            };
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        var i = game.sections.length,
        section;
        while(i--){
            section = game.sections[i];
            if(section.temp > 100){
                section.minerals.copper += 5 * deltaYears;
            }
            if(section.temp > 1800){
                section.minerals.gold += 0.125 * deltaYears;
            }
        }
    }
});