// sun.js plug-in
// append advanced properties to the sun
// object made with gameMod.create
gameMod.load({
    name: 'sun',
    callPriority: '0',
    create: function(game, opt){
        var sun = game.sun;
        sun.state = 'dead';
        sun.spawnRate = 16;
        sun.deadYears = 0;
        sun.toAlivePer = 0;
    },
    onDeltaYear: function(game, deltaYears){
        var sun = game.sun;
        if(sun.state === 'dead'){
            sun.deadYears += deltaYears;
            sun.deadYears = sun.deadYears > sun.spawnRate ? sun.spawnRate: sun.deadYears;
            sun.toAlivePer = sun.deadYears / sun.spawnRate;
            if(sun.toAlivePer >= 1){
                sun.state = 'alive';
                sun.deadYears = 0;
                sun.toAlivePer = 0;
            }
        }
    }
});