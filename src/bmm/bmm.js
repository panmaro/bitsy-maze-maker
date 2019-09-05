
let Room = require('./room');
let Pixels = require('./utils/pixels');
   
/**
 * 
 * @param {*} canvas 
 * @param {*} options 
 *      roomWidth
 *      roomHeight
 */
function process(canvas, options = {}) {

    const {
        roomWidth = 16,
        roomHeight = 16,
        pixelMaps = '000000 1\r\nffffff 0\rff0000 a,b,c',
        horizontalLoop = false,
        verticalLoop = false,
        roomIndexOffset = 0,
    } = options;

    function xyname(x,y) {
        return 'r' + x + '_' + y;
    }
    
    function xyid(x,y) {
        return roomIndexOffset + y*hr + x;
    }

    const rooms = {};

    const hr = Math.ceil(canvas.width / roomWidth);
    const vr = Math.ceil(canvas.height / roomHeight);

    const { parsedPixelMaps, parsedWalls } = parsePixelMap(pixelMaps);

    // left right top bottom border of the room
    const lbr = Math.floor((16 - roomWidth) / 2);
    const rbr = Math.ceil((16 + roomWidth) / 2) - 1;
    const tbr = Math.floor((16 - roomHeight) / 2);
    const bbr = Math.ceil((16 + roomHeight) / 2) - 1;

    const colors = new Set();
    const pixelMapColorSet = new Set();
    const exitColors = {};

    for (let key in parsedPixelMaps) {
        pixelMapColorSet.add(key);
    }

    // walls 
    for (let ivr = 0; ivr < vr; ivr++) {
        for (let ihr = 0; ihr < hr; ihr++) {
            
            let px = new Pixels(canvas).rect(ihr * roomWidth, ivr * roomHeight, roomWidth, roomHeight);
            let room = new Room(xyid(ihr, ivr), xyname(ihr, ivr));
            rooms[room.name] = room;

            for (let y = 0; y < roomHeight; y++) {
                for (let x = 0; x < roomWidth; x++) {
                    let color = px.getColorHEX(x, y);
                    colors.add(color);
                    if (!pixelMapColorSet.has(color)) {
                        if (!exitColors[color]) exitColors[color] = [];
                        exitColors[color].push({ x: x + lbr, y: y + tbr, ihr, ivr });
                    }
                    room.cell(x + lbr, y + tbr, pixelMapping(color, parsedPixelMaps));
                }
            }
        }
    }
    
    // exits
    for (let color in exitColors) {

        let exits = exitColors[color];
        
        if (exits.length < 2) continue;

        // connecting two exits together
        connectExits(
            rooms[xyname(exits[0].ihr, exits[0].ivr)], exits[0].x, exits[0].y,
            rooms[xyname(exits[1].ihr, exits[1].ivr)], exits[1].x, exits[1].y
        );
    }

    // running between rooms - horizontal
    for (let y = tbr + 1; y < bbr ; y++) {
        for (let ivr = 0; ivr < vr; ivr++) {
            for (let ihr = 0; ihr < hr; ihr++) {
                   
                if (ihr === hr - 1) {
                    if (horizontalLoop) {
                        connectExits(
                            rooms[xyname(ihr, ivr)], rbr, y,
                            rooms[xyname(0, ivr)], lbr, y,
                            parsedWalls
                        )
                    }
                } else {
                    connectExits(
                        rooms[xyname(ihr, ivr)], rbr, y,
                        rooms[xyname(ihr + 1, ivr)], lbr, y,
                        parsedWalls
                    )
                }   
                
            }
        }
    }
        
    // running between rooms - vertical
    for (let x = lbr + 1; x < rbr; x++) {        
        for (let ivr = 0; ivr < vr; ivr++) {
            for (let ihr = 0; ihr < hr; ihr++) {

                if (ivr === vr - 1) {
                    if (verticalLoop) {
                        connectExits(
                            rooms[xyname(ihr, ivr)], x, bbr,
                            rooms[xyname(ihr, 0)], x, tbr,
                            parsedWalls
                        )
                    }
                } else {
                    connectExits(
                        rooms[xyname(ihr, ivr)], x, bbr,
                        rooms[xyname(ihr, ivr + 1)], x, tbr,
                        parsedWalls
                    )
                }   
                
            }
        }
    }
    
    let resColors = {};
    resColors.colors = Array.from(colors);
    resColors.tiles = resColors.colors.filter((c) => !exitColors[c]);
    resColors.exits = resColors.colors.filter((c) => exitColors[c] && exitColors[c].length === 2);
    resColors.unknown = resColors.colors.filter((c) => !pixelMapColorSet.has(c) && exitColors[c] && exitColors[c].length < 2);

    return { rooms, colors: resColors };
}

function parsePixelMap(pixelMaps) {
    let result = {};
    let resultWalls = new Set();
    pixelMaps.split(/\r|\n/g).
        filter(i => i.trim().length > 0).
        map(i => i.trim().split(' ')).
        map(j => {
            if (!j[0].includes('#')) j[0] = '#' + j[0];
            if (j[1].includes(',')) j[1] = j[1].split(','); else j[1] = [j[1]];
            return j;
        }).forEach(i => {
            result[i[0]] = i[1]; // {#color => [a,b,c], ...}
            if (i[2] && i[2].includes('/w')) { // wall
                i[1].forEach(val => resultWalls.add(val)); 
            }
        }); 
    return { parsedPixelMaps: result, parsedWalls: resultWalls };
}

function pixelMapping(color, parsedPixelMaps) {
    if (typeof parsedPixelMaps[color] === 'undefined') return '0';
    //else if (typeof parsedPixelMaps[color] === 'string') return parsedPixelMaps[color];
    else return parsedPixelMaps[color][Math.floor(Math.random() * parsedPixelMaps[color].length)];
}

function connectExits(room1, x1, y1, room2, x2, y2, parsedWalls) {

    if (!room1 || !room2) debugger;
    console.log('ce', room1.cell(x1, y1), room2.cell(x2, y2), room1.exit(x1, y1), room2.exit(x2, y2));
    
    if (parsedWalls && (parsedWalls.has(room1.cell(x1, y1)) || parsedWalls.has(room1.cell(x2, y2)))) return;

    if (room1.exit(x1, y1) || room2.exit(x2, y2)) return;
    room1.exit(x1, y1, room2.id, x2, y2);
    room2.exit(x2, y2, room1.id, x1, y1);    
}

exports.process = process;
