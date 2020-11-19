stateMod.load({
    name: 'ui-sections',
    // create method for the game state
    create: function(sm){
        
    },
    buttons: {
        0 : {
            x: 300,
            y: 20,
            r: 16,
            click: function(sm){
                //console.log('click');
                sm.currentState = 'ui-sun'
            }
        }
    },
    // update and draw
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
    },
    draw: function(d, ctx, canvas, game, sm){
        d.back(sm);
        d.buttons(sm);
        d.ver(sm);
    }
});
