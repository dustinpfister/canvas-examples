// extended draw methods for Mr Sun Blocks
stateMod.load((function(){
    var blockColors = ['white', 'black'];
    return {
        name: 'init-draw-blocks',
        init: function (sm) {
            // draw blocks for the given section
            sm.draw.cells = function(sm, section, offsetX, offsetY){
                section = section === undefined ? sm.game.currentSection : section;
                var ctx = sm.ctx;
                section.cells.forEach(function(cell){
                    var block = cell.block,
                    x = offsetX + cell.x * 16,
                    y = offsetY + cell.y * 16;
                    ctx.fillStyle = 'white';
                    if(block){
                        ctx.fillStyle = blockColors[block.type];
                    }
                    ctx.fillRect(x, y, 16, 16);
                });
            };
            // draw mineral info for a section
            var drawMineralInfo = function(ctx, obj, offsetX, offsetY){
                Object.keys(obj.minerals).forEach(function(minName, i){
                    var minCount = obj.minerals[minName],
                    x = offsetX,
                    y = offsetY + 10 * i;
                    ctx.fillText(minName + ': ' + minCount, x, y);
                });
            };
            sm.draw.sectionMineralInfo = function(sm, section, offsetX, offsetY){
                var ctx = sm.ctx;
                ctx.fillStyle = 'white';
                ctx.font = '10px arial';
                ctx.textAlign = 'left';
                ctx.textBaseLine  =  'top';
                drawMineralInfo(ctx, section, offsetX, offsetY);
            };
            // draw mineral info for the sun
            sm.draw.sunMineralInfo = function(sm, offsetX, offsetY){
                var ctx = sm.ctx,
                sun = sm.game.sun;
                ctx.fillStyle = 'white';
                ctx.font = '10px arial';
                ctx.textAlign = 'left';
                ctx.textBaseLine  =  'top';
                drawMineralInfo(ctx, sun, offsetX, offsetY);
            };
        }
    };
}()));
