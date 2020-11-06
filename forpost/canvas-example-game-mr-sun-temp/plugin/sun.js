// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load({
    name: 'sun',
    callPriority: '0.0',
    create: function(game, opt){
        var sun = game.sun;
        sun.state = 'dead';
        sun.spawnRate = 5;
    },
    onDeltaYear: function(game, deltaYears){
    }
});