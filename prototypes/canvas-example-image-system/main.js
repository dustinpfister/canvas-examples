var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
inputStr = document.getElementById('img-str');

canvas.width = 320;
canvas.height = 320;

var w = 4, h = 4,
colorDepth = 2,
str = IMG.stringFromIndex(38505, colorDepth, w * h),
matrix = IMG.stringToChunk(str, w);
inputStr.value = parseInt(str, colorDepth);
IMG.draw(canvas, matrix);

// update by clicking canvas
canvas.addEventListener('click', function (e) {
    var bx = e.target.getBoundingClientRect(),
    size = canvas.width / w,
    x = Math.floor((e.clientX - bx.left) / size),
    y = Math.floor((e.clientY - bx.top) / size),
    px = matrix[y][x];
    px += 1;
    if (px >= colorDepth) {
        px = 0;
    }
    matrix[y][x] = px;
    str = IMG.chunkToString(matrix, colorDepth);
    inputStr.value = parseInt(str, colorDepth);
    IMG.draw(canvas, matrix);
});
// update from input element
inputStr.addEventListener('keyup', function (e) {
    var text = e.target.value,
    n = parseInt(text);
    if (n.toString() != 'NaN') {
        if (n >= IMG.totalImages(w, h, colorDepth)) {
            n = e.target.value = IMG.totalImages(w, h, colorDepth) - 1;
        }
        if (n < 0) {
            n = e.target.value = 0;
        }
        str = IMG.stringFromIndex(n, colorDepth, w * h);
        matrix = IMG.stringToChunk(str, w);
        IMG.draw(canvas, matrix);
    }
});
