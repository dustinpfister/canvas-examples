gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        console.log(this.name);
        game.sun.temp = 0;
        game.sections = game.sections.map((section)=>{
            section.temp = 0;
            return section;
        });
    },
    onDeltaYear: function(game, deltaYears){
        // sun will gain temp over time
        game.sun.temp = 10 + 10 * game.year;
        game.sun.temp = game.sun.temp > 10000 ? 10000: game.sun.temp;
        console.log('sun temp: ' + game.sun.temp);
    }
});