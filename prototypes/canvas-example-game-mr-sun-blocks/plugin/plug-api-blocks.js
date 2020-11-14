gameMod.load(function(){

    var createBlocksArray = function(){
        var blocks = [],
        w = 12,
        h = 5,
        i = 0,
        len = w * h;
        while(i < len){
            blocks.push({
                i: i,
                x: i % w,
                y: Math.floor(i / w),
                type: 0
            });
            i += 1;
        }
        return blocks;
    };

    var setSection = function(game, index){
        game.currentSectionIndex = index;
        game.currentSection = game.sections[game.currentSectionIndex];
    };

    return {
        name: 'plug-api-blocks',
        callPriority: 0.2,
        create: function(game, opt){
            console.log(this.name);

            // set up blocks for first time
            game.forSections(function(section){
                section.blocks = createBlocksArray();
            });

            // add setSection to game
            game.setSection = function(index){
                setSection(game, index);
            };

            setSection(game, 0);
        }
    };

}());