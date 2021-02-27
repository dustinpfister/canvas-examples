
var canvasObj = utils.createCanvas({
   width: 640,
   height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var input = controlMod(canvas);

// can add events
controlMod.add(input, 'pointerStart', function (pos, input, e) {
    console.log('pointer event staretd: ');
    console.log(pos);
});

controlMod.add(input, 'keydown', function (keys, input, e) {
    console.log('key down:');
    console.log('keys[65]: ' + keys[65]);
});

// can pull in a loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.debugInput(ctx, input);
};

loop();
