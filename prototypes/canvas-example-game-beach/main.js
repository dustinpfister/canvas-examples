var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = game.create({
        areaData: '00000000010000000001000000000100000000010000000001000000000100000000010000000001'
    });

console.log(state);

ctx.fillStyke = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
