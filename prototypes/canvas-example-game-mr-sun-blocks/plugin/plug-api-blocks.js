gameMod.load(function(){

    var MAX_BLOCK_TYPE_COUNTS = {
        rock: 24
    },
    GRID_WIDTH = 12,
    GRID_HEIGHT = 5;

    var createBlocksArray = function(){
        var blocks = [],
        w = GRID_WIDTH,
        h = GRID_HEIGHT,
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
    // set the current section
    var setSection = function(game, index){
        game.currentSectionIndex = index;
        game.currentSection = game.sections[game.currentSectionIndex];
    };
    // simple get block helper
    var getBlock = function(section, x, y){
        var block;
        if(x < 0 || y < 0 || x >= GRID_WIDTH || y >= GRID_HEIGHT){
            return false;
        }
        block = section.blocks[y * GRID_WIDTH + x];
        if(block){
            return block;
        }
        return false;
    };

    // get all the blocks of a block index
    var getAllBlocksOfIndex = function(section, blockIndex){
        return section.blocks.filter(function(block){
            return block.type === blockIndex;
        });
    };
    // apply 'gravity' to a block
    var gravity = function(section, block){
        if(block.type === 1){
            var below = getBlock(section, block.x, block.y + 1);
            if(below){
                if(below.type === 0){
                    below.type = block.type;
                    block.type = 0;
                }
            }
        }
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
            console.log('getBlock:');
            console.log( getBlock(game.sections[0], -1, 1) );
        },
        onDeltaYear: function(game, deltaYears){

            game.forSections(function(section){
                var bt = section.blockTypes;
                // just setting total for 'rocks' now.
                bt.rock.total = Math.floor(section.minerals.carbon / 100);
                bt.rock.total = bt.rock.total > MAX_BLOCK_TYPE_COUNTS.rock ? MAX_BLOCK_TYPE_COUNTS.rock: bt.rock.total;

                // use rocks
                if(bt.rock.used < bt.rock.total){
                    var freeBlocks = getAllBlocksOfIndex(section, 0);
                    freeBlocks[0].type = 1;
                    bt.rock.used += 1;
                }
                section.blocks.forEach(function(block){
                    // drop down if block below is empty
                    gravity(section, block);
                });
            });
        }
    };

}());