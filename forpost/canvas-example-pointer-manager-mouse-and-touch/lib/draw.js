var draw = (function(){
    var api = {};
    // draw background
    api.background = function(ctx, canvas, sm){
        ctx.fillStyle = sm.backgroundStyle || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var img = sm.backgroundImage;
        if(img){
            ctx.drawImage(sm.backgroundImage, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        }
    };
    // draw a pointer object
    api.pointerObj = function(ctx, canvas, pt){
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw version number
    api.ver = function(ctx, canvas, sm){
        ctx.fillStyle = '#0a0a0a';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = '10px arial';
        ctx.fillText('v' + sm.ver, 5, canvas.height - 15);
    };
    // return public api
    return api;
}());