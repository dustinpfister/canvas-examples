gameMod.load(function(){
    // constants
    var MAX_BLOCK_TYPE_COUNTS = {
        rock: 30
    },
    GRID_WIDTH = 12,
    GRID_HEIGHT = 5;
    // create a new blocks array
    var createCellsArray = function(){
        var cells = [],
        w = GRID_WIDTH,
        h = GRID_HEIGHT,
        i = 0,
        len = w * h;
        while(i < len){
            cells.push({
                i: i,
                x: i % w,
                y: Math.floor(i / w),
                type: 0,
                block: null // free cell if null, otherwise it is a refernce to the block that is here
            });
            i += 1;
        }
        return cells;
    };
    // create a new blocks array
    var createBlocksArray = function(){
        var blocks = [],
        w = GRID_WIDTH,
        h = GRID_HEIGHT,
        i = 0,
        len = w * h;
        while(i < len){
            blocks.push({
                i: i,
                active: false,
                type: 1
            });
            i += 1;
        }
        return blocks;
    };
    var getAllActiveBlocks = function(blocks, active){
        active = active === undefined ? true: active;
        return blocks.filter(function(block){
            return block.active === active;
        });
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
        block = section.cells[y * GRID_WIDTH + x];
        if(block){
            return block;
        }
        return false;
    };
/*
    // get all the blocks of a block index
    var getAllBlocksOfIndex = function(section, blockIndex){
        return section.cells.filter(function(block){
            return block.type === blockIndex;
        });
    };
    // get a random block from the given collection
    var getRandomBlock = function(collection){
        var len = collection.length,
        i = Math.round(Math.random() * ( len - 1 ));
        return collection.slice(i, i + 1)[0];
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
*/
    return {
        name: 'plug-api-blocks',
        callPriority: 0.2,
        create: function(game, opt){
            console.log(this.name);
            // set up cells and blocks
            game.forSections(function(section){
                section.cells = createCellsArray();
                section.blocks = createBlocksArray();

            });
            // add setSection to game
            game.setSection = function(index){
                setSection(game, index);
            };
            // set current section to sectionIndex 0
            setSection(game, 0);
            console.log(game.sections[0]);
            game.sections[0].blocks[2].active = true;
            game.sections[0].blocks[6].active = true;
            console.log(getAllActiveBlocks(game.sections[0].blocks));
        },
        onDeltaYear: function(game, deltaYears){

            game.forSections(function(section){

            });
        }
    };

}());