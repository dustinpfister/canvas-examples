gameMod.load({
    name: 'temp',
    callPriority: '1.0',
    create: function(game, opt){
        console.log(this.name);
    },
    onDeltaYear: function(game, deltaYears){
        
    }
});