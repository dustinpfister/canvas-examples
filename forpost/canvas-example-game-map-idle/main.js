
// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// BUILD MENU
var buildMenu = {
    yOffet: 0,
    buildOptions: [{
            name: 'farm',
            moneyPerTick: 1
        }
    ]
};

// STATE
var states = {

    currentState: 'init',

    grid: map.createGridObject(17, 13),
    pm: PM.newPM(),

    // ALWAYS STATE
    always: {
        tick: function () {
            // update and draw
            map.updateGrid(states.grid);
            draw.background(ctx, canvas); // background
            draw.map(states.grid, ctx, canvas); // the map
            draw.stateDebugInfo(ctx, states.currentState, states.grid, states);
        }
    },

    // INIT STATE
    init: {
        tick: function () {
            grid = states.grid;
            grid.offset = {
                x: grid.cellSize * grid.width / 2 * -1 + canvas.width / 2,
                y: grid.cellSize * grid.height / 2 * -1 + canvas.height / 2
            };
            map.setGridWorth(grid, 0, 0, 2);
            // starting building
            map.createBuilding(grid, 8, 6, 0);
            // enter disp state
            states.currentState = 'disp';
        }
    },

    // DISPLAY STATE
    disp: {
        tick: function () {
            PM.updatePM(states.pm);
            draw.gridStatusInfo(ctx, canvas, states.grid); // status bar
        },
        pointer: {
            start: function (pos, grid, e) {
                grid.mapMoveStartPoint = {
                    x: pos.x,
                    y: pos.y
                };
                PM.onPointerStart(states.pm, pos, e);
            },
            move: function (pos, grid, e) {
                // movement can trigger nave state
                PM.onPointerMove(states.pm, pos, e);
                if (states.pm.dist >= 32 && states.pm.down) {
                    states.currentState = 'nav';
                }
            },
            end: function (pos, grid, e) {
                // select a cell if not entering nav state
                if (states.pm.down) {
                    var cell = map.getCellFromCanvasPoint(grid, pos.x, pos.y);
                    if (cell.i === grid.selectedCellIndex) {
                        grid.selectedCellIndex = -1;
                    } else {
                        if (cell.i >= 0) {
                            grid.selectedCellIndex = cell.i;
                            var cell = grid.cells[cell.i];
                            // if cell index enter building state
                            if (cell.building.index >= 0) {
                                states.currentState = 'building';
                            } else {
                                // else enter land state
                                states.currentState = 'land';
                            }
                        }
                    }
                }
            }
        }
    },

    // NAV STATE
    nav: {
        tick: function () {
            PM.updatePM(states.pm);
            draw.navCirclePM(states.pm, ctx, canvas);
            PM.stepPointByPM(states.pm, grid.offset, true);
        },
        pointer: {
            move: function (pos, grid, e) {
                PM.onPointerMove(states.pm, pos, e);
            },
            end: function (pos, grid, e) {
                PM.onPointerEnd(states.pm, pos, e);
                // return to disp
                states.currentState = 'disp';
            }
        }
    },

    land: {
        tick: function () {
            draw.buildMenu(ctx, canvas, buildMenu);
        },
        pointer: {
            end: function (pos, grid, e) {
                if (pos.x >= 96) {
                    grid.selectedCellIndex = -1;
                } else {
                    // create a building
                    if (pos.y <= 96) {
                        var buildIndex = 0,
                        cell = grid.cells[grid.selectedCellIndex];
                        map.createBuilding(grid, cell.x, cell.y, buildIndex, buildMenu.buildOptions);
                    }
                }
                PM.onPointerEnd(states.pm, pos, e);
                states.currentState = 'disp';
            }
        }
    },

    building: {
        tick: function () {},
        pointer: {
            end: function (pos, grid, e) {
                PM.onPointerEnd(states.pm, pos, e);
                if (pos.x >= 96) {
                    grid.selectedCellIndex = -1;
                    states.currentState = 'disp';
                }
            }
        }
    }

};

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    states.always.tick();
    states[states.currentState].tick();
};
loop();

// EVENTS

// attach pointer events
var attachPointerEvent = function (canvas, domType, smType) {
    // attach a hander of the given domType to the canvas
    canvas.addEventListener(domType, function (e) {
        // get position and state
        var pos = u.getCanvasRelative(e),
        stateObj = states[states.currentState];
        // prevent default
        e.preventDefault();
        // if we have a point object
        if (stateObj.pointer) {
            var handler = stateObj.pointer[smType];
            // if we have a hander
            if (handler) {
                // do not fire handler if we go out of bounds
                // but trigger and end for the current state if
                // if is there
                if (pos.x < 0 || pos.x >= canvas.width || pos.y < 0 || pos.y >= canvas.height) {
                    var endHandler = stateObj.pointer.end;
                    if (endHandler) {
                        endHandler(pos, states.grid, e);
                    }
                } else {
                    // if we are in bounds just fire the hander
                    handler(pos, states.grid, e);
                }
            }
        }
    });
};

// mouse events
attachPointerEvent(canvas, 'mousedown', 'start');
attachPointerEvent(canvas, 'mousemove', 'move');
attachPointerEvent(canvas, 'mouseup', 'end');
attachPointerEvent(canvas, 'mouseout', 'end');
// touch events
attachPointerEvent(canvas, 'touchstart', 'start');
attachPointerEvent(canvas, 'touchmove', 'move');
attachPointerEvent(canvas, 'touchend', 'end');
attachPointerEvent(canvas, 'touchcancel', 'end');
