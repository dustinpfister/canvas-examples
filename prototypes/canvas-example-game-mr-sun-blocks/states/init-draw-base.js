stateMod.load({
    name: 'init-draw-base',
    init: function (sm) {
        // draw background method
        sm.draw.back = function (sm) {
            sm.ctx.fillStyle = '#000020';
            sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
        };
        // basic draw sections method
        sm.draw.sections = function (sm) {
            var ctx = sm.ctx;
            sm.game.sections.forEach(function (section) {
                var b = 50 + Math.round(section.per * 128);
                ctx.fillStyle = 'rgb(0,0,' + b + ')';
                ctx.strokeStyle = '#808080';
                ctx.beginPath();
                ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '8px arial';
            });
        };
        // draw Mr Sun
        sm.draw.sun = function (sm) {
            var sun = sm.game.sun,
            ctx = sm.ctx;
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
        };
        // display
        sm.draw.disp = function (sm) {
            var ctx = sm.ctx;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.fillText('year: ' + sm.game.year, 3, 10);
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
    }
});
