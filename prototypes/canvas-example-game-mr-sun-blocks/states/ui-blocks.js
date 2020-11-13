stateMod.load((function(){



    return {
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
            var offsetX = 160 - 16 * 12 / 2,
            offsetY = 120 - 16 * 5 / 2;
            d.blocks(sm, sm.game.currentSection, offsetX, offsetY);
            d.ver(sm);
        },
        // events
        pointerStart: function (sm, pos, e) {
        },
        pointerMove: function (sm, pos, e) {},
        pointerEnd: function (sm, pos) {
            sm.currentState = 'ui-sun';
        }
    };

}()));
