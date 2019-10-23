const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Get the width and height from the canvas element
const width = canvas.width,
      height = canvas.height;

// Work out the width and height in blocks
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

// Set score to 0
var score = 0;

//An array for created squares
var arraySquare = [];

var interval;

// The Square constructor
var Square = function (col, row) {
 	this.x = col;
	this.y = row;
	this.ySpeed = Math.floor(Math.random() * 5) + 0.5;
	this.color = pickRandomColor (); //give each new square a random color
};

//function picks random color from the array 
function pickRandomColor () {
	let colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
	return colors [Math.floor(Math.random()*colors.length)];
};

//Method which draws a square 
Square.prototype.draw = function (color) {
	let x = this.x * blockSize;
	let y = this.y * blockSize;
	ctx.fillStyle = this.color;
	ctx.fillRect(x, y, blockSize, blockSize);
};

//Method which moves a square
Square.prototype.move = function () {
	this.y += this.ySpeed;
};

//Method defines square where user clicked
Square.prototype.clicked = function (offsetX_click, offsetY_click) {
	let x = this.x * blockSize;
	let y = this.y * blockSize;
	if (offsetX_click >= x && offsetX_click <= (x + blockSize) && offsetY_click <= y && offsetY_click >= (y - blockSize)) 
		{
			document.getElementById("score").innerHTML = ++score; 
			this.color = "Black"; 
		}
};

function start () {
	document.getElementById("score").innerHTML= "0";
	let i = 0;	
	interval = setInterval (function () {
		ctx.clearRect(0, 0, width, height);
		var square = new Square (Math.floor(Math.random() * (widthInBlocks - 2)) + 1, 1);
		arraySquare.push(square);
		for (let j=0; j < arraySquare.length; j++) {
			arraySquare[j].draw ();
			arraySquare[j].move ();		    
		}
		ctx.strokeRect (0,0, width, height);
		i++;
    }, 120);
}

canvas.addEventListener('click', function (e) {
    for (let i = 0; i < arraySquare.length; i++) {
       arraySquare[i].clicked(e.offsetX, e.offsetY); 
    }
  });

function stop () {
	arraySquare = [];
	clearInterval (interval);
	ctx.fillStyle = "Black";
	ctx.fillRect(0, 0, width, height);	
}