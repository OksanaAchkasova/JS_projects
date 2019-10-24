class Canvas {
  constructor () {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.blockSize = 10  
  }

  start () {
  	let score = 0;
 	document.getElementById("score").innerHTML= score;
 	this.animate.call(this, score); 	
  }

  animate (score) {
  	let arraySquare = [], //An array for created squares
  	    widthInBlocks = this.width / this.blockSize,
  	    that = this;
  	  
    interval = setInterval (function () {
  		that.ctx.clearRect(0, 0, that.width, that.height);
 		let square = new Square (Math.floor(Math.random() * (widthInBlocks - 2)) + 1, 1);
 		arraySquare.push(square);
 		for (let elem of arraySquare) {
 		 	elem.draw(that.ctx, that.blockSize);
 		 	elem.move();
 		 }
 		that.ctx.strokeRect (0,0, that.width, that.height);
 	}, 120);

  	that.canvas.addEventListener("click", (e) => {
	for (let elem of arraySquare) 
	  	if (elem.clicked(e.offsetX, e.offsetY, that.blockSize))
	  		document.getElementById("score").innerHTML = ++score;
	});
  }

  stop (arraySquare) {
  	let that = this;
	arraySquare = [];
	clearInterval (interval);
	that.ctx.fillStyle = "Black";
	that.ctx.fillRect(0, 0, that.width, that.height);	
  }

}

let interval;
let canv = new Canvas();
