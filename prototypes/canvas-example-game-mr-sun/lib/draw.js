var draw = (function(){
    // public API
    var api = {};
    // draw background
    api.back = function(sm){
        sm.ctx.fillStyle = '#202020';
        sm.ctx.fillRect(0,0,sm.canvas.width, sm.canvas.height);
    };
    // draw sections
    api.sections = function(sm){
        var ctx = sm.ctx;
        sm.game.sections.forEach(function(section){
            var b = 50 + Math.round(section.per * 128);
            ctx.fillStyle = 'rgb(0,0,' + b + ')';
            ctx.beginPath();
            ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2 );
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '10px arial';
            ctx.fillText(Math.round(section.per * 100), section.x, section.y);
        });
    };
    // draw sun
    api.sun = function(sm){
        var sun = sm.game.sun;
        sm.ctx.fillStyle = 'yellow';
        sm.ctx.beginPath();
        sm.ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2 );
        sm.ctx.fill();
    };
    // return the Public API
    return api;
}());