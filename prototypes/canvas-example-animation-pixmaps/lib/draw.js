var draw = {};

// BACKGROUND
draw.background = function(ctx, canvas){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
};

// INFO
draw.ffInfo = function(ctx, ff,  x, y){
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('frame: ' + ff.frame + ' / ' + ff.maxFrame, x, y);
};

draw.ver = function(ctx, canvas, state){
    ctx.fillStyle='white';
    ctx.textBaseline='top';
    ctx.textAlign='left';
    ctx.font='10px arial';
    ctx.fillText('v' + state.ver, 2, canvas.height - 12);
};

