
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');

var input = controlMod(canvas);

// can add events
controlMod.add(input, 'pointerStart', function (pos, input, e) {
    console.log('pointer event staretd: ');
    console.log(pos);
});

// can pull in a loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.debugInput(ctx, input);
};

loop();
