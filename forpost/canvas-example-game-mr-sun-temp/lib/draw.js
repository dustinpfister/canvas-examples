var draw = (function () {

    // public API
    var api = {};

    // HELPERS
    var drawMineralList = function(ctx, obj, startY, fontSize){
        startY = startY === undefined ? 0 : startY;
        fontSize = fontSize || 10;
        if(obj.minerals){
            ctx.font = fontSize + 'px arial';
            Object.keys(obj.minerals).forEach(function(min, i){
                ctx.fillText(min + ': ' + obj.minerals[min].toFixed(2), 10, startY + i * fontSize);
            });
        }
    };

    // SECTIONS:
    api.sectionData = function(sm, section){
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('section ' + section.i, 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('groundTemp: ' + section.groundTemp.toFixed(2), 10, 30);
        ctx.fillText('temp: ' + section.temp.toFixed(2), 10, 40);
        drawMineralList(ctx, section, 50, 10);
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
            ctx.fillText(section.per.toFixed(2), section.x, section.y-5);
            //ctx.fillText(section.groundTemp.toFixed(2) + ':' + section.temp.toFixed(2), section.x, section.y+5);
            //var min = section.minerals;
            //ctx.fillText(min.copper + ':' + min.gold, section.x, section.y-5);
            ctx.fillText(section.temp.toFixed(2), section.x, section.y + 5);
        });
    };

    // SUN
    api.sunData = function(sm, sun){
        var game = sm.game;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '15px arial';
        ctx.fillText('Sun Status: ', 10, 10);
        ctx.font = '10px arial';
        ctx.fillText('status: ' + game.sun.state, 10, 30);
        ctx.fillText('years: ' + game.tempData.years, 10, 40);
        ctx.fillText('temp: ' + sun.temp.toFixed(2), 10, 50);
        ctx.fillText('tempLevel: ' + game.tempData.i + '/' + Number(game.tempData.len - 1), 10, 60);

        drawMineralList(ctx, sun, 70, 10);

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
            if(tempObj.i === game.tempData.i){
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
    // draw sun
    api.sun = function (sm) {
        var sun = sm.game.sun,
        color = 'yellow',
        textColor = 'black',
        ctx = sm.ctx;
        if(sun.state === 'dead'){
            color = 'black';
            textColor = 'white';
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.font = '10px arial';
        if(sun.state === 'alive'){
            ctx.fillText(Math.round(sun.temp), sun.x, sun.y);
        }
        if(sun.state === 'dead'){
            ctx.fillText(Math.round(sun.toAlivePer * 100), sun.x, sun.y);
        }
    };

    // MISC

    // draw background
    api.back = function (sm) {
        sm.ctx.fillStyle = '#202020';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
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
