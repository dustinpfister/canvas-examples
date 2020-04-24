var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

ctx.fillStyke = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
