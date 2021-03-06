stateMod.load({
    name: 'ui-sun',
    // create method for the game state
    create: function(sm){
        var sun = sm.game.sun;
        sun.move = function(game, pos){
            var radius = game.worldRadius - game.sectionRadius;
            if(utils.distance(pos.x, pos.y, game.centerX, game.centerY) < radius){
                gameMod.moveSun(game, pos);
            }
        };
        // sudo section objects transition helper
        sm.sudoSectionsTrans = function(sm, per){
            var csIndex = sm.data.currentSection,
            csSection = sm.sudoSections[csIndex];
            csSection.radius = csSection.homeRadius + 60 * per;

            sm.sudoSections.forEach(function(sudoSection){
                var section = sm.game.sections[sudoSection.i],
                a = sm.getAngle(sm.game.centerX, sm.game.centerY, csSection.homeX, csSection.homeY),
                dx = sm.game.worldRadius * Math.cos(a) * per,
                dy = sm.game.worldRadius * Math.sin(a) * per;
                sudoSection.x = sudoSection.homeX - dx;
                sudoSection.y = sudoSection.homeY - dy;

                sudoSection.sprite.radian = section.sprite.radian;

                // scale sprite
                sm.scaleSpriteToDispObj(sudoSection);

            });
        };

    },
    buttons: {
        sections : {
            x: 300,
            y: 20,
            r: 16,
            click: function(sm, pos, button, e, state, game){
                // start the transition to a new state
                // start transition in 'forward direction' as we are going 'forward to a new state'
                sm.startTrans({
                    newStateName: 'ui-sections',
                    forward: true,
                    data: {}
                });
            }
        }
    },
    // init will be called every time the state starts (for first time, or from another state)
    init: function(sm, opt){
        // start transition in 'reverse' as we are coming 'back from another state'
        sm.startTrans({
            newStateName: '', // we are not chaning states when it comes to this
            forward: false,
            data: {}
        });
    },
    // update and draw
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
    },
    draw: function(d, ctx, canvas, game, sm){
        // always draw backgound
        d.back(sm);
            // if the trans is running
            if(sm.state.trans.action === 'running'){
                d.sections(sm, sm.sudoSections);
            }

            if(sm.state.trans.action === 'end'){
                // else draw game state
                d.sections(sm);
                d.sun(sm);
                d.disp(sm);
                // info for all sections
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '10px arial';
                game.forSections(function(section){
                    ctx.fillText(section.text, section.x, section.y);
                });
                // info for sun
                ctx.fillStyle = 'black';
                ctx.fillText(sm.game.sun.text, sm.game.sun.x, sm.game.sun.y);
            }
        // always draw buttons and version number
        d.buttons(sm);
        d.ver(sm);
    },
    pointer : {
        start: function (sm, pos, e) {
            sm.game.sun.move(sm.game, pos);
        },
        move: function (sm, pos, e) {
            if (sm.input.pointerDown) {

                sm.game.sun.move(sm.game, pos);
                // ajust alpha for section sprites
                sm.game.forSections(function(section){
                    section.sprite.alpha = section.per;
                });
            }
        },
        end: function(sm, pos, e){

            if (sm.input.d < 3) {
                // if section click
                var section = gameMod.getSectionByPos(sm.game, pos.x, pos.y);
                if (section) {
                    sm.data.currentSection = section.i;
                    sm.startTrans({
                        newStateName: 'ui-sections',
                        forward: true,
                        data: {}
                    });
                }
                // if sun click
                if (utils.distance(sm.game.sun.x, sm.game.sun.y, pos.x, pos.y) <= sm.game.sun.radius) {
                    //
                }
            }
        }
    },
    trans: {
        maxFrame: 50, // frames used
        maxSecs: 1.5,  // target trans time in seconds
        action: 'end',
        start: function(sm, trans, data){
            var secButton = sm.state.buttons.sections;
            var per = 1;
            if(trans.forward){
                secButton.x = 300 - 320 * 1;
                per = 1;
            }else{
                secButton.x = 300 - 320 * 0;
                per = 0;
            }

            sm.setSudoSections();
            sm.sudoSectionsTrans(sm, per);
        },
        update: function(sm, trans, frame, maxFrame, per, data){
            var secButton = sm.state.buttons.sections;
            secButton.x = 300 - 320 * per;
            sm.sudoSectionsTrans(sm, per);
        },
        end: function(sm, trans, data){
            sm.state.buttons.sections.x = 300;
        }
    }
});
