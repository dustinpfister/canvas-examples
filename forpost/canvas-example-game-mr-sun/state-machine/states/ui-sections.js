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
        // can use a function
        back : function(sm, createButton){
            return createButton({ x: 300, y: 20, click: function(sm){
                //sm.currentState = 'ui-sun';
                sm.changeState('ui-sun');
            }});
        },
        left : {
            x: 20,
            y: 120,
            r: 16,
            click: function(sm){
                //sm.currentState = 'ui-sun'
                sm.data.currentSection += 1;
                sm.data.currentSection = sm.data.currentSection >= sm.game.sections.length ? 0 : sm.data.currentSection;
            }
        },
        right : {
            x: 300,
            y: 120,
            r: 16,
            click: function(sm){
                //sm.currentState = 'ui-sun'
                sm.data.currentSection -= 1;
                sm.data.currentSection = sm.data.currentSection < 0 ? sm.game.sections.length - 1 : sm.data.currentSection;
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
        var section = sm.game.sections[sm.data.currentSection];
        
        ctx.fillText('count : ' + section.cookie.count, 10, 30);
        ctx.fillText('rate : ' + section.cookie.rate, 10, 40);
        ctx.fillText('max : ' + section.cookie.max, 10, 50);
        ctx.fillText('per : ' + section.per, 10, 60);
    }
});
