stateMod.load({
    name: 'ui-sections',
    // create method for the game state
    create: function(sm){
        // set a sm.data.currentSection
        sm.data = sm.data || {};
        sm.data.currentSection = 0;
    },
    buttons: {
        // can use a function
        back : function(sm, createButton){
            return createButton({ x: 300, y: 20, click: function(sm){
                //sm.changeState('ui-sun');
                sm.startTrans({
                    newStateName: 'ui-sun',
                    forward: true,
                    data: {}
                });
            }});
        },
        left : {
            x: 20,
            y: 120,
            r: 16,
            click: function(sm){
                sm.data.currentSection += 1;
                sm.data.currentSection = sm.data.currentSection >= sm.game.sections.length ? 0 : sm.data.currentSection;
            }
        },
        right : {
            x: 300,
            y: 120,
            r: 16,
            click: function(sm){
                sm.data.currentSection -= 1;
                sm.data.currentSection = sm.data.currentSection < 0 ? sm.game.sections.length - 1 : sm.data.currentSection;
            }
        }
    },
    init: function(sm, opt){
        // start transition in 'reverse' as we are coming 'back from another state'
        sm.startTrans({
            newStateName: '', // we are not chaning states when it comes to this
            forward: false,
            data: {}
        });
    },
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
    },
    trans: {
        maxFrame: 50, // frames used
        maxSecs: 1,  // target trans time in seconds
        action: 'end',
        start: function(sm, trans, data){
            var buttons = sm.state.buttons;
            buttons.back.x = -20;
            buttons.left.x = -20;
            buttons.right.x = -20;
        },
        update: function(sm, trans, frame, maxFrame, per, data){
             var buttons = sm.state.buttons;
             buttons.back.x = 300 - 320 * per;
             buttons.left.x = 20 - 32 * per;
             buttons.right.x = sm.canvas.width - 20 + 32 * per;
            //var secButton = sm.state.buttons.back;
            //secButton.x = 300 - 320 * per;

        },
        end: function(sm, trans, data){
        }
    }

});
