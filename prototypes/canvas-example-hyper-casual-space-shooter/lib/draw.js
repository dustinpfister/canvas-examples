var draw = (function(){

    var drawHealthBar = function(ctx, obj){
        if(obj.hp){
            if(obj.hp.per < 1){
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2, 5);
                ctx.fillStyle="rgba(120,120,120,0.4)";
                ctx.fill();
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2 * obj.hp.per, 5);
                ctx.fillStyle="rgba(0,255,0,0.4)";
                ctx.fill();
            }
        }
    };

    // base draw object helper
    var baseObjectDraw = function(ctx, obj, render){
        ctx.save();
        ctx.translate(160, 120);
        ctx.fillStyle= obj.fillStyle || 'gray';
        ctx.strokeStyle= obj.strokeStyle || 'white';
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if(render){
            render(ctx, obj);
        }
        if(obj.hp){
            drawHealthBar(ctx, obj);
        }
        ctx.restore();
    };

    return {
        // draw background
        background: function (ctx, state) {
            var canvas = state.canvas,
            map = state.game.map,
            r = Math.floor(map.per * 255);
            ctx.fillStyle = 'rgba(' + r + ',0,0,1)';
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
                ctx.lineWidth = 3;
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
            var game = state.game,
            map = game.map;
            ctx.fillStyle = 'yellow';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            ctx.fillText('map pos: ' + Math.floor(map.x) + ' , ' + Math.floor(map.y), 10, 10);
            ctx.fillText('map radian: ' + map.radian.toFixed(2) + '; map pps: ' + map.pps.toFixed(2), 10, 20);
            ctx.fillText('map dist: ' + map.dist.toFixed(2) + ' ('+Math.floor(map.per * 100)+'%)', 10, 30);
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