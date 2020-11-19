stateMod.load({
    name: 'ui-sections',
    // create method for the game state
    create: function(sm){
        // set a sm.data.currentSection
        sm.data = sm.data || {};
        sm.data.currentSection = 0;
        console.log(sm.data.currentSection);
    },
    buttons: {
        0 : {
            x: 300,
            y: 20,
            r: 16,
            click: function(sm){
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
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = '10px arial';
        ctx.fillText('section# : ' + sm.data.currentSection, 10, 10);
    }
});
