var draw = (function(){

    // draw a health bar for an object
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

    var api = {};

    // draw background
    api.background = function (ctx, state) {
        var canvas = state.canvas,
        map = state.game.map,
        r = Math.floor(map.per * 255);
        ctx.fillStyle = 'rgba(' + r + ',0,0,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw current mode
    api.currentMode = function(ctx, state){
        var game = state.game;
        draw.gridLines(state.ctx, state, 'rgba(255,255,255,0.1)');
        baseObjectDraw(ctx, game.baseObj, function(){});
        if(game.mode === 'base'){
            baseObjectDraw(ctx, game.buttons.base[0], function(){});
        }
        draw.blocks(state.ctx, state);
        draw.ship(state.ctx, state);
        draw.shots(state.ctx, state);
    };

    api.shots = function(ctx, state){
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
    };
    api.blocks = function(ctx, state){
        var game = state.game;
        state.game.blocks.objects.forEach(function(block){
            if(block.active){
                baseObjectDraw(ctx, block, function(ctx, block){
                    ctx.fillStyle = 'yellow';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.font = '8px arial';
                    ctx.fillText(Math.floor(block.hp.current) + '/' + Math.floor(block.hp.max) , block.x, block.y);
                    ctx.fillText(block.money.toFixed(2), block.x, block.y + 8);
                });
            }
        });
    };
    api.ship = function(ctx, state){
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
    };
    api.gridLines = function (ctx, state, style) {
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
    };
    // draw game state info
    api.info = function(ctx, state){
        var game = state.game,
        ship = game.ship,
        w = ship.weapon,
        map = game.map;
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('map pos: ' + Math.floor(map.x) + ' , ' + Math.floor(map.y), 10, 10);
        ctx.fillText('map radian: ' + map.radian.toFixed(2) + '; map pps: ' + map.pps.toFixed(2) + ' / ' + map.maxPPS.toFixed(2), 10, 20);
        ctx.fillText('map dist: ' + map.dist.toFixed(2) + ' ('+Math.floor(map.per * 100)+'%)', 10, 30);
        ctx.fillText('a to origin: ' + map.aToOrigin.toFixed(2), 10, 40);
        ctx.fillText('weapon : ' + w.name + ', damage: ' + w.shotDamage + ', fps: ' + w.firesPerSecond, 10, 50);
        ctx.fillText('money : ' + game.money.toFixed(2) + '$', 10, 60);
        ctx.fillText('mode : ' + game.mode, 10, 70);
    };
    // draw current version number
    api.ver = function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    };
    // draw an xp table
    api.xpTable = function(ctx, table, x, y){
        table.points.forEach(function(point, i){
            if(i===0){
                ctx.beginPath();
                ctx.moveTo(x + point.x, y + point.y);
            }
            ctx.lineTo(x + point.x, y + point.y);
        });
        ctx.strokeStyle = 'lime';
        ctx.stroke();
    };
    // return draw api
    return api;
}());