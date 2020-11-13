stateMod.load({
    name: 'ui-blocks',
    // init method for the game state
    init: function(sm){
        
    },
    // update and draw
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
    },
    draw: function(d, ctx, canvas, game, sm){
        d.back(sm);
        d.ver(sm);
    },
    // events
    pointerStart: function (sm, pos, e) {
        
    },
    pointerMove: function (sm, pos, e) {
        
    },
    pointerEnd: function (sm, pos) {
        
    }
});