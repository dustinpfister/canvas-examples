var draw = (function(){

    var TRANSLATE_TO = {
        x: 160,
        y: 120
    };

    // THE GRIDLINES
    // ( playing around with diff settings, but this should be just a single object)
    var GRIDLINES = [
        {  // large grid size might be best
            cellSize:   128,
            cellWidth:  5,
            cellHeight: 5,
            lineWidth: 1,
            strokeStyle: 'rgba(255,255,255,0.1)',
            //fillStyle: 'rgba(0,0,0,0.1)'
        },
        {
            cellSize:   32,
            cellWidth:  14,
            cellHeight: 14,
            lineWidth: 1,
            strokeStyle: 'white',
        },
        {
            cellSize:   16,
            cellWidth:  28,
            cellHeight: 28
        },
    ][0];

    // base draw object helper
    var baseObjectDraw = function(ctx, obj, render){
        ctx.save();
        ctx.translate(TRANSLATE_TO.x, TRANSLATE_TO.y);
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
        ctx.restore();
        ctx.save();
        // draw an hp bar for the object if it has one
        if(obj.hp){
            ctx.translate(TRANSLATE_TO.x, TRANSLATE_TO.y);
            drawHealthBar(ctx, obj);
        }
        ctx.restore();
    };


    // draw an 'arrow' to the base
    var drawArrowToBase = function(ctx, game){

        baseObjectDraw(ctx, {
            x: Math.cos(game.map.aToOrigin) * 32,
            y: Math.sin(game.map.aToOrigin) * 32,
            r: 5,
            fillStyle: 'black'
        },
        function(ctx, obj){
            ctx.fillStyle = 'red',
            ctx.translate(obj.x, obj.y);
            ctx.rotate(game.map.aToOrigin);
            ctx.beginPath();
            ctx.moveTo(obj.r, 0);
            ctx.lineTo(obj.r * -1, obj.r);
            ctx.lineTo(obj.r * -1, obj.r * -1);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fill();
        });

    };

    // draw background
    var background = function (ctx, state, style) {
        var canvas = state.canvas,
        map = state.game.map,
        r = Math.floor(map.per * 255);
        ctx.fillStyle = style || 'rgba(' + r + ',0,0,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // draw a mini map that will help me to get a better idea of where I am
    var positionMap = function(ctx, state){
        var map = state.game.map;
        var minMap = {
            x: 20,
            y: -20,
            r: 10,
            fillStyle: 'rgba(255,0,0,0.2)'
        };

        baseObjectDraw(ctx, minMap, function(ctx, minMap){
            var radian = map.aToOrigin + Math.PI;
            var x = Math.cos(radian) * minMap.r * map.per,
            y = Math.sin(radian) * minMap.r * map.per;
            ctx.translate(minMap.x, minMap.y);
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(x,y,1,0,Math.PI*2);
            ctx.stroke();
        });

    };

    // position status
    var positionStatus = function(ctx, state){
        var game = state.game,
        map = game.map;
        
        // base text style
        ctx.fillStyle='yellow';
        ctx.textBaseline='top';
        ctx.textAlign='left';
        ctx.font='8px courier';

        var sx = 160, sy = 200;
        ctx.fillText('position status: ', sx, sy);
        ctx.fillText('pos: (' + Math.floor(map.x) + ',' + Math.floor(map.y) + ')', sx, sy + 8);
        ctx.fillText('dist: ' + Math.floor(map.dist), sx, sy + 16);
        ctx.fillText('per: ' + Math.floor(map.per * 100) + '%', sx, sy + 24);

    };

    // display effects info for current weapon
    var effectsInfo = function(ctx, state){
        var game = state.game,
        weapon = game.ship.weapon;
        
        // base text style
        ctx.fillStyle='lime';
        ctx.textBaseline='top';
        ctx.textAlign='left';
        ctx.font='8px courier';

        //ctx.fillText('effects: ' + weapon.effects.length, 5, 40);
        var sx = 25;
        weapon.effects.forEach(function(effectType, index){
            var sy = 40 + 50 * index,
            effect = game.effects[effectType];
            ctx.fillText(effect.effectType + ':', sx, sy);
            ctx.fillText(' chance  : ' + Math.round(effect.chance * 100) + '%', sx, sy + 8);
            ctx.fillText(' maxStack: ' + effect.maxStack, sx, sy + 16);
            if(effect.effectType === 'burn'){
                ctx.fillText(' damage%: ' + Math.round(effect.damagePer * 100) + '%', sx, sy + 24);
                ctx.fillText(' count ' + effect.count, sx, sy + 32);
            }
            if(effect.effectType === 'acid'){
                ctx.fillText(' damage: ' + effect.damageMulti.toFixed(2) + 'X', sx, sy + 24);
            }
        });
    };

    // draw game status bar info
    var statusBar = function(ctx, state){
        var game = state.game,
        ship = game.ship,
        map = game.map,
        weapon = game.ship.weapon,
        grad = ctx.createLinearGradient(0, 0, 0, 20);
        grad.addColorStop(0, '#808080');
        grad.addColorStop(1, 'rgba(0,0,255,0.07)');

        // backdrop for status bar
        ctx.fillStyle=grad; //"rgba(128,128,128,0.5)";
        ctx.fillRect(0,0, state.canvas.width, 40);

        // base text style
        ctx.fillStyle='white';
        ctx.textBaseline='top';
        ctx.textAlign='left';

        // must display money
        ctx.font='10px courier';
        ctx.fillText(utils.format_money(game.money), 220, 5);

        // ship speed and heading
        ctx.font='8px courier';
        ctx.fillText('speed  : ' + Math.floor(map.pps) + ' / ' + Math.floor(map.maxPPS), 220, 13);
        ctx.fillText('heading: ' + map.degree.toFixed(2), 220, 20);

        // basic weapon info
        ctx.font='10px courier';
        ctx.fillText(weapon.name, 5, 5);
        ctx.font='8px courier';
        ctx.fillText('Shot Damage:' + weapon.shotDamage.toFixed(2), 5, 13);
        ctx.fillText('Fires/sec  :' + weapon.firesPerSecond.toFixed(2), 5, 20);

        // HP Bar
        ctx.fillStyle='#2a2a2a';
        ctx.fillRect(160 - 50, 5, 100, 15);
        ctx.fillStyle='#af0000';
        ctx.fillRect(160 - 50, 5, 100 * ship.hp.per, 15);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font='8px arial';
        ctx.fillText(ship.hp.current + ' / ' + ship.hp.max, 160, 9);

        // Energy bar
        ctx.fillStyle='#2a2a2a';
        ctx.fillRect(160 - 50, 20, 100, 8);
        ctx.fillStyle='#afaf00';
        ctx.fillRect(160 - 50, 20, 100 * ship.energy.per, 8);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font='8px arial';
        ctx.fillText(Math.round(ship.energy.current) + ' / ' + ship.energy.max, 160, 20);
    };

    // draw a health bar for an object
    var drawHealthBar = function(ctx, obj){
        if(obj.hp){
            if(obj.hp.per < 1){
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2, 5);
                ctx.fillStyle="rgba(120,120,120,0.7)";
                ctx.fill();
                ctx.beginPath();
                ctx.rect(obj.x - obj.r, obj.y + obj.r - 5, obj.r * 2 * obj.hp.per, 5);
                ctx.fillStyle="rgba(0,255,0,0.4)";
                ctx.fill();
            }
        }
    };

    // darw shots
    var shots = function(ctx, state){
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

    // draw blocks
    var blocks = function(ctx, state){
        var game = state.game;
        state.game.blocks.objects.forEach(function(block){
            if(block.active){
                baseObjectDraw(ctx, block, function(ctx, block){
                    ctx.fillStyle = 'yellow';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.font = '9px arial';
                    var effectsText = Object.keys(block.effectStats).map(function(effectType){
                        return effectType + ' ' + block.effectStats[effectType] + 'x';
                    }).join(' : ');
                    ctx.fillText(effectsText, block.x, block.y - 9);
                    ctx.fillText(Math.floor(block.hp.current) + '/' + Math.floor(block.hp.max) , block.x, block.y);
                    ctx.fillText(utils.format_money(block.money) + ' ; ' +
                        'A' + block.armor.minDam + ' ; ' +
                        'D' + block.damage, block.x, block.y + 9);
                });
            }
        });
    };

    // draw the player ship
    var ship = function(ctx, state){
        var game = state.game;
        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        baseObjectDraw(ctx, game.ship, function(){
            var radian = game.map.radian;
            ctx.rotate(radian);
            ctx.strokeStyle = 'white';
            ctx.fillStyle='#0060ff'
            ctx.beginPath();
            ctx.moveTo(game.ship.r, 0);
            ctx.lineTo(game.ship.r * -1, game.ship.r);
            ctx.lineTo(game.ship.r * -1, game.ship.r * -1);
            ctx.closePath();
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill();
        });
    };

    // draw grid lines so that we know that we are in fact moving
    var gridLines = function (ctx, state, style) {
        var grid = GRIDLINES;
        var sx = grid.cellWidth * grid.cellSize / 2 * -1 - (state.game.map.x % grid.cellSize),
        sy = grid.cellHeight * grid.cellSize / 2 * -1 + (state.game.map.y % grid.cellSize) * -1,
        x, y,
        len = grid.cellWidth * grid.cellHeight,
        i = 0;
        ctx.strokeStyle = grid.strokeStyle || 'red';
        //ctx.fillStyle = grid.fillStyle || 'lime';
        ctx.lineWidth = grid.lineWidth || 1;
        ctx.save();
        ctx.translate(TRANSLATE_TO.x, TRANSLATE_TO.y);
        while(i < len){
            x = sx + (i % grid.cellWidth) * grid.cellSize;
            y = sy + Math.floor(i / grid.cellWidth) * grid.cellSize;
            ctx.beginPath();
            ctx.rect(x,y,grid.cellSize, grid.cellSize);
            ctx.stroke();
            //if(grid.fillStyle){
            //    ctx.fill();
            //}
            i += 1;
        }
        ctx.restore();
    };

    // draw game state info for debuging
    var info = function(ctx, state){
        var game = state.game,
        ship = game.ship,
        w = ship.weapon,
        headCir = state.input.pointer.headCir,
        map = game.map;
        if(state.debug){
            background(ctx, state, 'rgba(0,0,0,0.5)');
            ctx.fillStyle = 'yellow';
            ctx.font = '10px arial';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';

            // block spawning
            var activeBlocks = poolMod.getAllActive(game.blocks);
            ctx.fillText('active blocks : ' + activeBlocks.length, 10, 10);


/*
            ctx.fillText('mode : ' + game.mode, 10, 10);
            ctx.fillText('a to origin: ' + map.aToOrigin.toFixed(2), 10, 20);
            ctx.fillText('headCir dist : ' + headCir.dist, 10, 30);
            ctx.fillText('headCir a : ' + headCir.a, 10, 40);
            ctx.fillText('headCir d : ' + headCir.d, 10, 50);
            ctx.fillText('headCir dir : ' + headCir.dir, 10, 60);
*/

/*
            ctx.fillText('map pos: ' + Math.floor(map.x) + ' , ' + Math.floor(map.y), 10, 10);
            ctx.fillText('map radian: ' + map.radian.toFixed(2) + 
                '; map pps: ' + map.pps.toFixed(2) + ' / ' + map.maxPPS.toFixed(2), 10, 20);
            ctx.fillText('map dist: ' + map.dist.toFixed(2) + ' ('+Math.floor(map.per * 100)+'%)', 10, 30);
            ctx.fillText('a to origin: ' + map.aToOrigin.toFixed(2), 10, 40);
            ctx.fillText('weapon : ' + w.name + 
                '; damage: ' + w.shotDamage.toFixed(2) + 
                '; fps: ' + w.firesPerSecond.toFixed(2), 10, 50);
            ctx.fillText('money : ' + game.money.toFixed(2) + '$', 10, 60);
            ctx.fillText('mode : ' + game.mode, 10, 70);
*/
        }
    };

    // draw current version number
    var ver = function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    };

    // draw FPS info
    var FPS = function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '8px arial';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('FPS: ' + Math.floor(state.FPS), 50, state.canvas.height - 15);
    };

    // draw an xp table or upgrade object
    var xpTable = function(ctx, table){
        ctx.beginPath();
        table.points.forEach(function(point, i){
            if(i===0){
                ctx.moveTo(table.x + point.x, table.y + point.y);
            }
            ctx.lineTo(table.x + point.x, table.y + point.y);
        });
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.rect(table.x, table.y, table.w, table.h);
        ctx.stroke();
        // if upgrate object draw circle over current level point
        if(table.levelIndex >= 0){
            var point = table.points[table.levelIndex];
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.arc(table.x + point.x, table.y + point.y, 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    };

    // PUBLIC API

    var api = {};

    // draw current game mode
    api.currentMode = function(ctx, state){
        var game = state.game;

        // draw background
        background(ctx, state);

        // draw grid lines
        gridLines(ctx, state, 'rgba(255,255,255,0.1)');

        // draw base object
        baseObjectDraw(ctx, game.baseObj, function(){});

        // draw any buttons for the current mode
        var buttons_mode = game.buttons[game.mode];
        if(buttons_mode){
            var buttons_page = buttons_mode[game.buttons.currentPage];
            Object.keys(buttons_page).forEach(function(key){
                baseObjectDraw(ctx, buttons_page[key], function(ctx, button){
                    ctx.fillStyle = 'yellow';
                    ctx.textAlign='center';
                    ctx.textBaseline='middle';
                    ctx.font='8px arial';
                    ctx.fillText(button.desc, button.x, button.y);
                    var cost = button.cost;
                    if(cost != undefined){
                        ctx.fillText(utils.format_money(button.cost), button.x, button.y + 10);
                    }
                });
            });
        }

        if(game.mode === 'base'){
            if(game.buttons.currentPage != 'main'){
               // statusBar(ctx, state);
            }
            // draw grids for the current weapon
            if(game.buttons.currentPage === 'weapons'){
                var upgradeIndex = game.ship.weaponIndex * 2 + 3;
                xpTable(ctx, game.upgrades[upgradeIndex]);
                xpTable(ctx, game.upgrades[upgradeIndex + 1]);
            }
            if(game.buttons.currentPage === 'ship'){
                xpTable(ctx, game.upgrades[0]);
                xpTable(ctx, game.upgrades[1]);
                xpTable(ctx, game.upgrades[2]);
            }
            if(game.buttons.currentPage === 'effects'){
                effectsInfo(ctx, state);
            }
        }

        // draw an 'arrow' object that points to the base if in space mode
        if(game.mode === 'space'){
            // draw blocks and shots
            blocks(ctx, state);
            shots(ctx, state);
            // draw an arrow back to the base
            drawArrowToBase(ctx, game);
            // position status and map
            positionStatus(ctx, state);
            positionMap(ctx, state);
            effectsInfo(ctx, state);
            //statusBar(ctx, state);
        }

        // draw blocks, the ship, and shots
        ship(ctx, state);

        // draw the games status bar
        statusBar(ctx, state);

        // draw debug info
        info(ctx, state);

        // draw version number
        ver(ctx, state);

        // draw fps counter
        FPS(ctx, state);

    };

    // draw the pointer user interface
    api.pointerUI = function(ctx, state){
         var headCir = state.input.pointer.headCir,
         ppsBar = state.input.pointer.ppsBar;
         // draw headCir
         ctx.strokeStyle='white';
         ctx.beginPath();
         ctx.arc(headCir.x, headCir.y, headCir.r, 0, Math.PI * 2);
         ctx.stroke();
         // draw pps bar
         ctx.strokeStyle='white';
         ctx.beginPath();
         ctx.rect(ppsBar.x,ppsBar.y,ppsBar.w,ppsBar.h);
         ctx.stroke();
         // actual
         ctx.fillStyle='yellow';
         ctx.beginPath();
         var h = ppsBar.h - ppsBar.h * ( ( ppsBar.actualY - ppsBar.y ) /  ppsBar.h);
         ctx.rect(ppsBar.x, ppsBar.actualY, ppsBar.w, h);
         ctx.fill();
         // target
         ctx.fillStyle='white';
         ctx.beginPath();
         ctx.rect(ppsBar.x - 2, ppsBar.targetY - 3, ppsBar.w + 4, 6);
         ctx.fill();
    };

    // return draw api
    return api;
}());