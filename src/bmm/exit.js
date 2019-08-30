
class Exit {
	
	constructor(sx,sy,tr,tx,ty) {
		this.pos = [sx,sy];
		this.targetRoom = tr
		this.targetPos = [tx,ty];
	}
	
	exportToBitsy() {		
		let res = ['EXT', this.pos.join(','), this.targetRoom, this.targetPos.join(',')].join(' ');
		return res;
		
	}	
	
}

module.exports = Exit