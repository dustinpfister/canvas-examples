gameMod.load(function(){
    // constants
/*
    var MAX_BLOCK_TYPE_COUNTS = {
        rock: 30
    },
*/
    var MASS_FOR_ALL_BLOCKS = 1000, // mass for all blocks active
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
    // simple get block helper
    var getCell = function(section, x, y){
        var cell;
        if(x < 0 || y < 0 || x >= GRID_WIDTH || y >= GRID_HEIGHT){
            return false;
        }
        cell = section.cells[y * GRID_WIDTH + x];
        if(cell){
            return cell;
        }
        return false;
    };
    var getEmptyCell = function(section){
        var i = 0,
        cell,
        len = section.cells.length;
        while(i < len){
            cell = section.cells[i];
            if(cell.block === null){
               return cell;
            }
            i += 1;
        }
        return false;
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
                cell: null,
                active: false,
                type: 1
            });
            i += 1;
        }
        return blocks;
    };
    // get all active or inactive blocks
    var getAllActiveBlocks = function(blocks, active){
        active = active === undefined ? true: active;
        return blocks.filter(function(block){
            return block.active === active;
        });
    };
    // apply 'gravity' to a block
    var gravity = function(section, block){
        //if(block.type === 1){
        var belowCell = getCell(section, block.cell.x, block.cell.y + 1);
        if(belowCell){
            if(belowCell.block === null){
                block.cell.block = null;
                belowCell.block = block;
                block.cell = belowCell;
            }
        }
        //}
    };
    // update blocks
    var updateBlocks = function(section){
        var activePer = section.totalMass / MASS_FOR_ALL_BLOCKS;
        activePer = activePer > 1 ? 1 : activePer;
        var topIndex = Math.floor(activePer * section.blocks.length);
        section.blocks.forEach(function(block){
            block.active = block.i < topIndex;
            if(!block.cell && block.active){
                var cell = getEmptyCell(section);
                if(cell){
                    cell.block = block;
                    block.cell = cell;
                }
            }
        });
    };



    // set the current section
    var setSection = function(game, index){
        game.currentSectionIndex = index;
        game.currentSection = game.sections[game.currentSectionIndex];
    };
/*
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
                updateBlocks(section);
            });
        }
    };

}());