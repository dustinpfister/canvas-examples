
var draw = (function(){

    var api = {};

    api.background = function(ctx, canvas, sm){
        ctx.fillStyle = sm.backgroundStyle || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var img = sm.backgroundImage;
        if(img){
            ctx.drawImage(sm.backgroundImage, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        }
    };

    api.pointerObj = function(ctx, canvas, pt){
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.stroke();
    };

    return api;
}());