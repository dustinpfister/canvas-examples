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
    },
    buttons: {
        0 : {
            x: 300,
            y: 50,
            r: 16,
            click: function(){
                console.log('click');
            }
        }
    },
    // update and draw
    update: function (sm, secs) {
        gameMod.update(sm.game, secs);
    },
    draw: function(d, ctx, canvas, game, sm){
        d.back(sm);
        d.sections(sm);
        d.sun(sm);
        d.disp(sm);
        d.buttons(sm);
        d.ver(sm);
        // info for all sections
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '10px arial';
        game.forSections(function(section){
            ctx.fillText(section.cookie.count, section.x, section.y);
        });
        // info for sun
        ctx.fillStyle = 'black';
        ctx.fillText(sm.game.jar.count, sm.game.sun.x, sm.game.sun.y);
    },
    pointer : {
        start: function (sm, pos, e) {
            sm.game.sun.move(sm.game, pos);
        },
        move: function (sm, pos, e) {
            if (sm.input.pointerDown) {
                sm.game.sun.move(sm.game, pos);
            }
        },
        end: function(){}
    }
});
