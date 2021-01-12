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

// BOX
draw.box = function(ctx, box){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
};
draw.box2 = function(ctx, box){
    ctx.save();
    ctx.fillStyle = box.fillStyle || 'red';
    ctx.strokeStyle = box.strokeStyle || 'white';
    ctx.beginPath();
    ctx.translate(box.x, box.y);
    ctx.rotate(box.r);
    ctx.rect(box.w / 2 * -1, box.h / 2 * -1, box.w, box.h);
    if(box.fillStyle){
        ctx.fill();
    }
    if(box.strokeStyle){
        ctx.stroke();
    }
    ctx.restore();
};

// FF_TYPES
draw.types = {
    plain: function(ctx, ff){
        //console.log('hello?');
        draw.box2(ctx, ff.model);
    },
    points: function(ctx, ff){

       //ctx.fillStyle = 'white';
       //ctx.fillText(ff.model.points, 20, 50);
       ///console.log(typeof ff.model);
       ctx.strokeStyle = 'white';
       ctx.beginPath();
       ff.model.points.forEach(function(point, i){

           if(i == 0){
               ctx.moveTo(point.x, point.y);
           }else{
               ctx.lineTo(point.x, point.y);
           }

       });

       ctx.stroke();
    }
};
draw.ffType = function(ctx, ff){
    draw.types[ff.type](ctx, ff);
};
