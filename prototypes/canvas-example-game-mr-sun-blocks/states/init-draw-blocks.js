stateMod.load((function(){
    var blockColors = ['white', 'black'];
    return {
        name: 'init-draw-blocks',
        init: function (sm) {
            // draw blocks for the given section
            sm.draw.blocks = function(section){
                var ctx = sm.ctx;
                section.blocks.forEach(function(block){
                    var x = block.x * 32,
                    y = block.y * 32;
                    ctx.fillStyle = blockColors[block.type];
                    ctx.fillRect(x, y, 32, 32);
                });
            };
        }
    };
}()));
