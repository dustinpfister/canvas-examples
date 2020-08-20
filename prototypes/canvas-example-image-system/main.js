var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d'),
inputStr = document.getElementById('img-str');
canvas.width = 320;
canvas.height = 320;

var draw = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var toBase36 = function (str) {
    return parseInt(str, 2).toString(36);
};
var fromBase36 = function (str) {
    return parseInt(str, 36).toString(2);
};


var str = IMG.stringFromIndex(parseInt('1111111111111111', 2), 2, 4 * 4);

console.log(str);
console.log(toBase36(str));
console.log(fromBase36(toBase36(str)));
draw(ctx, canvas);
