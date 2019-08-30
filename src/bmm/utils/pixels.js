
class Pixels {
	
	constructor(canvas, alpha = true) {
		this.canvas = canvas;		
		this.ctx = canvas.getContext("2d", { alpha: alpha });
		this.length = (alpha) ? 4 : 3;
	}
	
	rect(left,top,width,height) {
		this.data = this.ctx.getImageData(left, top, width, height);
		return this;
	}
	
	get width() {
		return this.data.width
	}

	get height() {
		return this.data.height
	}	
	
	getPixel(x, y) {
		let i = (y * this.data.width + x) * this.length;
		return this.data.data.slice(i, i + this.length);		
	}
	
	getColor(x, y) {
		let i = (y * this.data.width + x) * this.length;
		let d = this.data.data.slice(i, i + this.length);
		
		if (this.length === 3) {
			return d[0] << 16 + d[1] << 8 + d[2];
		} else {
			return d[0] << 24 + d[1] << 16 + d[2] << 8 + d[3];
		}
	}

	getColorHEX(x, y) {
		let i = (y * this.data.width + x) * this.length;
		let d = this.data.data.slice(i, i + 3);	
		
		let color = '#';
		for (let i = 0; i < 3; i++) {
			color += ('0' + (d[i] & 0xFF).toString(16)).slice(-2);
		}
		return color;
	}
	
	getColorR(x, y) {
		let i = (y * this.data.width + x) * this.length;
		return this.data.data[i];
	}	

	getColorAlpha(x, y) {
		if (this.length != 4) return 1;
		let i = (y * this.data.width + x) * 4;
		return this.data.data[i + 3] / 255;
	}	
}

module.exports = Pixels;