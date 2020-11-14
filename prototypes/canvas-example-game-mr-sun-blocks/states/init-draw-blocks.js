stateMod.load((function(){
    var blockColors = ['white', 'black'];
    return {
        name: 'init-draw-blocks',
        init: function (sm) {
            // draw blocks for the given section
            sm.draw.blocks = function(sm, section, offsetX, offsetY){
                section = section === undefined ? sm.game.currentSection : section;
                var ctx = sm.ctx;
                section.blocks.forEach(function(block){
                    var x = offsetX + block.x * 16,
                    y = offsetY + block.y * 16;
                    ctx.fillStyle = blockColors[block.type];
                    ctx.fillRect(x, y, 16, 16);
                });
            };
            // draw mineral info for a section
            sm.draw.sectionMineralInfo = function(sm, section, offsetX, offsetY){
                var ctx = sm.ctx;
                ctx.fillStyle = 'white';
                ctx.font = '10px arial';
                ctx.textAlign = 'left';
                ctx.textBaseLine  =  'top';
                Object.keys(section.minerals).forEach(function(minName, i){
                    var minCount = section.minerals[minName],
                    x = offsetX,
                    y = offsetY + 10 * i;
                    ctx.fillText(minName + ': ' + minCount, x, y);
                });
            };
        }
    };
}()));
