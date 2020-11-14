gameMod.load(function(){

    var MAX_BLOCK_TYPE_COUNTS = {
        rock: 24
    };

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

    // get all the blocks of a block index
    var getAllBlocksOfIndex = function(section, blockIndex){
        //return 
    };

    return {
        name: 'plug-api-blocks',
        callPriority: 0.2,
        create: function(game, opt){
            console.log(this.name);
            // set up blocks for first time
            game.forSections(function(section){
                section.blocks = createBlocksArray();
                section.blockTypes = {
                    rock: {
                        index: 1, // type index
                        total: 0, // total amount that is ready for the section
                        used: 0   // total amount used in the section
                    }
                };
            });
            // add setSection to game
            game.setSection = function(index){
                setSection(game, index);
            };
            // set current section to sectionIndex 0
            setSection(game, 0);
        },
        onDeltaYear: function(game, deltaYears){

            game.forSections(function(section){
                var bt = section.blockTypes;
                // just setting total for 'rocks' now.
                bt.rock.total = Math.floor(section.minerals.carbon / 100);
                bt.rock.total = bt.rock.total > MAX_BLOCK_TYPE_COUNTS.rock ? MAX_BLOCK_TYPE_COUNTS.rock: bt.rock.total;

                // use rocks
                if(bt.rock.used < bt.rock.total){
                }
            });
        }
    };

}());