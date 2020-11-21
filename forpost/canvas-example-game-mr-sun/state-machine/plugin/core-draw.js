stateMod.load({
    name: 'core-draw',
    type: 'plugin',
    create: function (sm) {
        // draw background method
        sm.draw.back = function(sm){
            var color = '#000020';
            if(sm.currentState === 'ui-sections'){
                var b = 50 + Math.round(sm.game.sections[sm.data.currentSection].per * 128);
                color = 'rgb(0,0,' + b + ')';
            }
            sm.ctx.fillStyle = color;
            sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
        };
        var drawSecton = function(ctx, section){
                var b = 50 + Math.round(section.per * 128);
                ctx.fillStyle = 'rgb(0,0,' + b + ')';
                ctx.beginPath();
                ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle='white';
                ctx.stroke();
        };
        sm.draw.sections = function (sm, sectionCollection) {
            var ctx = sm.ctx;
            sectionCollection = sectionCollection || sm.game.sections;
            sectionCollection.forEach(function (section) {
                drawSecton(ctx, section);
            });
            // make sure current section is drawn over all others
            drawSecton(ctx, sectionCollection[sm.data.currentSection]);
        };
        sm.draw.sun = function (sm) {
            var sun = sm.game.sun,
            ctx = sm.ctx;
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            //ctx.fillText(sm.game.jar.count, sun.x, sun.y);
        };
        // display
        sm.draw.disp = function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('year: ' + sm.game.year, 3, 10);
            ctx.fillText('sun exp: ' + sm.game.sun.xp, 3, 20);
            ctx.fillText('sun level: ' + sm.game.sun.levelObj.level, 3, 30);
        };
        // draw version number
        sm.draw.ver = function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
        };
        // draw buttons of the current state
        sm.draw.buttons = function(sm){
            var ctx = sm.ctx,
            state = sm.states[sm.currentState];
            ctx.fillStyle = 'red';
            if(state.buttons){
                Object.keys(state.buttons).forEach(function(buttonKey){
                    var button = state.buttons[buttonKey];
                    ctx.beginPath();
                    ctx.arc(button.x, button.y, button.r, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
        };
    }
});
