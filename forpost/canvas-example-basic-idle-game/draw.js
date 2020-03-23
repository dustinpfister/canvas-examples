var draw = {};

draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.stateStatusInfo = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('money: ' + state.money.toFixed(2) +
        ', manual: ' + state.gatherRate.manual +
        ', auto: ' + state.gatherRate.auto, 10, 10);
};

draw.tickProgressBar = function (ctx, canvas, state) {
    var t = new Date() - state.lastTick,
    per = t / state.tickRate;
    if (state.autoGatherActive) {
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, canvas.height - 10, canvas.width * per, 10);
    }
};

draw.debugUpgrades = function (ctx, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    state.US.forEach(function (uc, i) {
        ctx.fillText('upgrade: ' + uc.dispName + ', level: ' + uc.level, 10, 20 + 10 * i);
    });
};

draw.buttonLayout = function (ctx, blObj) {
    var i = blObj.buttons.length,
    b;
    while (i--) {
        b = blObj.buttons[i];
        ctx.fillStyle = 'red';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(b.label || '', b.x + b.w / 2, b.y + b.h / 2);
    }
};
