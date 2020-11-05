var draw = (function () {
    // public API
    var api = {};
    // draw background
    api.back = function (sm) {
        sm.ctx.fillStyle = '#202020';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };
    api.sectionData = function(sm, section){
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('section ' + section.i, 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('groundTemp: ' + section.groundTemp.toFixed(2), 10, 30);
        ctx.fillText('temp: ' + section.temp.toFixed(2), 10, 40);
        Object.keys(section.minerals).forEach(function(min, i){
            ctx.fillText(min + ': ' + section.minerals[min].toFixed(2), 10, 50 + i * 10);
        });
    };
    api.sunData = function(sm, sun){
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('Sun Status: ', 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('years: ' + sun.tempData.years, 10, 30);
        ctx.fillText('temp: ' + sun.temp.toFixed(2), 10, 40);
        ctx.fillText('tempLevel: ' + sun.tempData.i + '/' + Number(sun.tempData.len - 1), 10, 50);
        // draw graph
        var h = 100,
        w = 100,
        sy = 150,
        sx = 200;
        ctx.fillStyle = '#5f5f5f';
        ctx.fillRect(sx, sy - h, w, h);
        ctx.beginPath();
        sun.sunGrid.data.forEach(function(tempObj){
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'black';
            var temp = tempObj.valueOf(),
            y = sy - h * (temp / sun.sunGrid.max),
            x = sx + w * tempObj.per;
            if(tempObj.i === 0){
                ctx.moveTo(x, y);
            }else{
                ctx.lineTo(x, y);
            }
            if(tempObj.i === sun.tempData.i){
                ctx.stroke();
                ctx.beginPath();
                ctx.arc( x, y, 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
            }
        });
        ctx.stroke();
    };
    // draw sections
    api.sections = function (sm) {
        var ctx = sm.ctx;
        sm.game.sections.forEach(function (section) {
            var b = 50 + Math.round(section.per * 128);
            ctx.fillStyle = 'rgb(0,0,' + b + ')';
            ctx.beginPath();
            ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '8px arial';
            //ctx.fillText(section.per.toFixed(2), section.x, section.y-5);
            //ctx.fillText(section.groundTemp.toFixed(2) + ':' + section.temp.toFixed(2), section.x, section.y+5);
            //var min = section.minerals;
            //ctx.fillText(min.copper + ':' + min.gold, section.x, section.y-5);
            ctx.fillText(section.temp.toFixed(2), section.x, section.y+5);
        });
    };
    // draw sun
    api.sun = function (sm) {
        var sun = sm.game.sun,
        ctx = sm.ctx;
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.font = '10px arial';
        ctx.fillText(Math.round(sun.temp), sun.x, sun.y);
    };
    // display
    api.disp = function (sm) {
        var ctx = sm.ctx;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
        ctx.fillText('year: ' + sm.game.year, 3, 3);
    };
    // draw version number
    api.ver = function (sm) {
        var ctx = sm.ctx;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '10px courier';
        ctx.fillText('v' + sm.ver, 10, sm.canvas.height - 15);
    };
    // return the Public API
    return api;
}
    ());
