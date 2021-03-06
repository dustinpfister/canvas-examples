var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas
ctx = canvasObj.ctx;

// create state
var state = game.getState();

// create button layout
var buttons = state.US.map(function (us, i) {
        return {
            x: 170,
            y: 40 + 32 * i,
            w: 128,
            h: 32,
            label: us.dispName + ' (' + us.cost.current + ') ',
            onAction: function (pos, opt, b, e) {
                game.buyUpgrade(state, us);
                b.label = us.dispName + ' (' + us.cost.current + ') ';
            }
        };
    });

// push manual gather button
buttons.push({
    x: 16,
    y: 100,
    w: 64,
    h: 32,
    label: 'Gather',
    onAction: function (pos, opt, e) {
        game.manualGather(state);
    }
});

var blOptions = {
    attachTo: canvas,
    buttons: buttons
};
var blObj = utils.mkButtonLayout(blOptions);

var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.tickProgressBar(ctx, canvas, state);
    draw.stateStatusInfo(ctx, state);
    draw.buttonLayout(ctx, blObj);
    draw.debugUpgrades(ctx, state);
    game.update(state);
};
loop();
