gameMod.load({
    name: 'energy',
    callPriority: 0,
    create: function(game, opt){
        console.log(this.name);
        game.sections = game.sections.map(function(section){
            section.energy = 0;
            return section;
        });
        game.data = game.data || {};
        game.data.energy = {
            maxEnergyDelta: 1
        };
    },
    onDeltaYear: function(game, deltaYears){
        var maxEnergyDelta = game.data.energy.maxEnergyDelta;
        game.sections = game.sections.map(function(section){
            var energyDelta = maxEnergyDelta * section.per * deltaYears;
            section.energy = section.energy + energyDelta;
            section.energy = Number(section.energy.toFixed(2));
            return section;
        });
    }
});