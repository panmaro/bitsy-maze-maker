
let Exit = require('./exit');

class Room {
	
	constructor(id, name) {
		this.cells = Array(256).fill("0");
		this.name = name;
		this.id = id
		this.exits = [];
		this.pal = 0;
	}
	
	cell(x,y,v) {
		let i = y * 16 + x;
		
		if (typeof v === 'undefined') return this.cells[i];
		return this.cells[i] = v;
	}
	
	exit(sx, sy, trm, tx, ty) {
	
		let i = sy * 16 + sx;

		if (typeof trm === 'undefined') {
			return this.exits[i];
		}

		let ext = new Exit(...arguments);
		
		this.exits[i] = ext;
	}


	
	exportToBitsy() {
		
		let res = ['ROOM ' + this.id];
		for (var y = 0; y < 16; y++) {
			res.push(this.cells.slice(y*16, y * 16 + 16).join(','));
		}
		res.push('NAME ' + this.name);
		this.exits.forEach((e)=>e && res.push(e.exportToBitsy()));
		res.push('PAL ' + this.pal);
		return res.join('\r\n');
		
	}	
	
}

module.exports = Room ;