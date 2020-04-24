var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var areaData = '' +
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000'+
'0000000001000000';

var state = game.create({
        areaData: areaData
    });

console.log(state);

draw.back(ctx, canvas);
draw.cells(ctx, state);
