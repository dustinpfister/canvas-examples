// SETUP CANVAS
(function () {
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    });
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    // State Machine
    var sm = {
        ver: '0.1.0',
        canvas: canvas,
        ctx: ctx,
        game: gameMod.create(),
        currentState: 'game',
        setState: function(sm, key){
            sm.currentState = key;
            sm.states[sm.currentState].init(sm);
        },
        states: {
            mainMenu: {},
            game: {
               init: function(sm){
                   sm.game = gameMod.create();
               },
               update: function(sm){
                   gameMod.update(sm.game);
                   if(sm.game.hp <= 0){
                       sm.setState(sm, 'gameOver');
                   }
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
            gameOver: {
                init: function(sm){},
                update: function(sm){},
                onClick: function(sm, pos, e){
                    sm.setState(sm, 'game');
                },
                draw: function(sm, ctx, canvas){
                    ctx.fillStyle = 'white';
                    ctx.fillText('Game Over click to try again', 10, 10);
                }
            }
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
