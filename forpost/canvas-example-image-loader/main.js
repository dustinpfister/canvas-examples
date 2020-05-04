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
        fileCount: 2,
        onFileLoad: function (per, i, img, e) {
            // update something like a loading bar here
        },
        onError: function (e, i, img) {
            console.log('Error loading image');
            console.log(img);
            draw.back(ctx, canvas);
        },
        onDone: function (imgArr) {
            console.log('files loaded');
            draw.back(ctx, canvas);
            draw.cellIndex(ctx, imgArr[1], 0, 10, 10);
        }
    });
