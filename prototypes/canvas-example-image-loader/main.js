// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var img = imgLoad({
        baseURL: './img/',
        fileCount: 1,
        onFileLoad: function (per, i) {
            console.log(per, i);
        },
        onDone: function (imgArr) {
            console.log('files loaded');
            console.log(imgArr);
            draw.back(ctx, canvas);
            ctx.drawImage(imgArr[0], 0, 0);
        }
    });

/*
var loop = function () {
requestAnimationFrame(loop);
draw.back(ctx, canvas);

};

loop();
*/
