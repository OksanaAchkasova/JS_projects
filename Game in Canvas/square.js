class Square {
	constructor(col, row) {
		this.x = col;
		this.y = row;
		this.ySpeed = Math.floor(Math.random() * 2) + 0.5;
		this.color = this.pickRandomColor ();

	}

	pickRandomColor () {
			let letters = '0123456789ABCDEF';
    		let color = '#';
   			for (let i = 0; i < 6; i++) 
       			color += letters[Math.floor(Math.random() * 16)];
    		return color;
		}

	//Method which draws a square
	draw(canvas, blockSize) {
		let x = this.x * blockSize;
		let y = this.y * blockSize;
		canvas.fillStyle = this.color;
		canvas.fillRect(x, y, blockSize, blockSize);
	}

    //Method which moves a square
	move() {
		this.y += this.ySpeed;
	}

	//Method defines which square was clicked by user
	clicked (offsetX_click, offsetY_click, blockSize) {
	let x = this.x * blockSize;
	let y = this.y * blockSize;
	if (offsetX_click >= x && offsetX_click <= (x + blockSize) && offsetY_click <= y && offsetY_click >= (y - blockSize)) 
		{
			this.color = "Black"; 
			return true;
		}
    }
}