gameMod.load({
    name: 'fusion',
    callPriority: '1.1',
    create: function(game, opt){
        console.log(this.name);
    },
    onDeltaYear: function(game, deltaYears){
        
    }
});