var mapMod = (function () {

    return {

        create: function () {

            var map = {
                cellSize: 32,
                cellWidth: 8,
                cellHeight: 8,
                cells: []
            };

            var i = 0,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                map.cells.push({
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth)
                });
                i += 1;
            }

console.log(map);
            return map;

        }

    }

}
    ());
