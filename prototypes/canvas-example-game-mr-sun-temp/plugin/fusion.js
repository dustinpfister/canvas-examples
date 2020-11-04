gameMod.load({
    name: 'fusion',
    callPriority: '1.2',
    create: function(game, opt){
        console.log(this.name);
    },
    onDeltaYear: function(game, deltaYears){
        
    }
});