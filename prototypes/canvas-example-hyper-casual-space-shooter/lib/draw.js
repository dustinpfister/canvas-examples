var draw = (function(){

    // base draw object helper
    var baseObjectDraw = function(ctx, obj, render){
        ctx.save();
        ctx.translate(160, 120);
        ctx.fillStyle= obj.fillStyle || 'gray';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
        ctx.fill();
        if(render){
            render(ctx, obj);
        }
        ctx.restore();
    };

    return {
        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        shots: function(ctx, state){
           var game = state.game;
            state.game.shots.objects.forEach(function(shot){
                if(shot.active){
                    baseObjectDraw(ctx, shot, function(ctx, shot){
                        ctx.fillStyle = 'yellow';
                        ctx.textBaseline = 'middle';
                        ctx.textAlign = 'center';
                    });
                }
            });
        },
        blocks: function(ctx, state){
            var game = state.game;
            state.game.blocks.objects.forEach(function(block){
                if(block.active){
                    baseObjectDraw(ctx, block, function(ctx, block){
                        ctx.fillStyle = 'yellow';
                        ctx.textBaseline = 'middle';
                        ctx.textAlign = 'center';
                        ctx.fillText(Math.floor(block.data.dist), block.x, block.y);
                    });
                }
            });
        },
        ship: function(ctx, state){
            var game = state.game;
            ctx.fillStyle = 'rgba(0,0,255,0.2)';

            baseObjectDraw(ctx, game.ship, function(){
                var radian = game.map.radian;
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(
                    game.ship.x + Math.cos(radian) * game.ship.r,
                    game.ship.y + Math.sin(radian) * game.ship.r
                );
                ctx.lineTo(game.ship.x, game.ship.y);
                ctx.stroke();
            });

        },
        gridLines : function (ctx, state, style) {
            var grid={
                cellSize: 64,
                cellWidth: 7,
                cellHeight: 7,
                xOffset: state.game.map.x,
                yOffset: state.game.map.y
            },
            sx = grid.cellWidth * grid.cellSize / 2 * -1 - (grid.xOffset % grid.cellSize),
            sy = grid.cellHeight * grid.cellSize / 2 * -1 + (grid.yOffset % grid.cellSize) * -1,
            x, y,
            len = grid.cellWidth * grid.cellHeight,
            i = 0;
            ctx.strokeStyle = style || 'red';
            ctx.lineWidth = 1;
            ctx.save();
            ctx.translate(160, 120);
            while(i < len){
                x = sx + (i % grid.cellWidth) * grid.cellSize;
                y = sy + Math.floor(i / grid.cellWidth) * grid.cellSize;
                ctx.beginPath();
                ctx.rect(x,y,grid.cellSize, grid.cellSize);
                ctx.stroke();
                i += 1;
            }
            ctx.restore();
        },
        info: function(ctx, state){
            var game = state.game;
            ctx.fillStyle = 'yellow';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('map pos: ' + Math.floor(game.map.x) + ' , ' + Math.floor(game.map.y), 10, 10);
            ctx.fillText('map radian: ' + game.map.radian.toFixed(2) + '; map pps: ' + game.map.pps.toFixed(2), 10, 20);
        },
        ver: function(ctx, state){
            ctx.fillStyle = 'yellow';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
        }
    };
}());