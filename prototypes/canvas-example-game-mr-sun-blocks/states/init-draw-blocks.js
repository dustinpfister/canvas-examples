stateMod.load((function(){
    var blockColors = ['white', 'black'];
    return {
        name: 'init-draw-blocks',
        init: function (sm) {
            // draw blocks for the given section
            sm.draw.blocks = function(sm, section){
                section = section === undefined ? sm.game.currentSection : section;
                var ctx = sm.ctx;
                section.blocks.forEach(function(block){
                    var x = block.x * 16,
                    y = block.y * 16;
                    ctx.fillStyle = blockColors[block.type];
                    ctx.fillRect(x, y, 16, 16);
                });
            };
        }
    };
}()));
