// SETUP CANVAS
(function () {
    var canvasObj = utils.createCanvas();
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    // State Machine
    var sm = {
        ver: '0.1.0',
        canvas: canvas,
        ctx: ctx,
        game: gameMod.create(),
        currentState: 'game',
        states: {
            mainMenu: {},
            game: {
               update: function(sm){
                   sm.game.grid.update();
               },
               onClick: function(sm, pos, e){
                   var cell = sm.game.grid.getCellFromPoint(pos.x, pos.y);
                   if (cell.enemy) {
                       sm.game.grid.kills += 1;
                       cell.enemy = false;
                   }
               },
               draw: function(sm, ctx, canvas){
                   draw.gridCellLines(sm.game.grid, ctx);
                   draw.disp(sm.game, ctx);
               }
            },
            gameOver: {}
        }
    };

    // single event handler
    canvas.addEventListener('click', function (e) {
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].onClick(sm, pos, e);
    });

    // app loop
    var loop = function () {
        requestAnimationFrame(loop);

        // call update method for current state
        sm.states[sm.currentState].update(sm);

        // draw
        draw.cls(sm.ctx, sm.canvas);
        sm.states[sm.currentState].draw(sm, sm.ctx, sm.canvas);
        draw.ver(sm, sm.ctx);
    };
    loop();
}
    ());
