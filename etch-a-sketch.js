// select the elements on to the page - canvas, shake button

// canvas
const canvas = document.querySelector('#etch-a-sketch');

// context - where we draw our things (circles, lines etc)
const ctx = canvas.getContext('2d');

// shake button
const shakeBtn = document.querySelector('.shake');

// buttons
const buttons = document.querySelectorAll('[type="button"]');

// make some constant
const MOVE_AMOUNT = 40;

// setup our canvas for drawing

// make a variable for the actual height and width of canavas
const width = canvas.width;
const height = canvas.height;

// create random x and y starting point on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// some defaults
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0; // for change the line color
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
	// change the "hue" value by 1
	hue += 10;
	ctx.strokeStyle = `hsl(${Math.random() * 360},100%,50%)`;
	// start the drawing
	ctx.beginPath();
	ctx.moveTo(x, y);
	// change the value of x and y on the basis of user using switch
	switch (key) {
		case 'ArrowUp':
			y -= MOVE_AMOUNT;
			break;

		case 'ArrowDown':
			y += MOVE_AMOUNT;
			break;

		case 'ArrowLeft':
			x -= MOVE_AMOUNT;
			break;

		case 'ArrowRight':
			x += MOVE_AMOUNT;
			break;

		default:
			break;
	}

	ctx.lineTo(x, y);
	ctx.stroke();
}

// write a handler for the keys
function handlekey(e) {
	if (e.key.includes('Arrow')) {
		e.preventDefault();
		draw({ key: e.key });
	}
}

// clear/shake function
function clearCanvas() {
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height); // clear the canvas
	// start the drawing
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, y);
	ctx.stroke();

	canvas.addEventListener(
		'animationend',
		function () {
			canvas.classList.remove('shake');
		},
		{ once: true }
	);
}

// add click event for shake button
shakeBtn.addEventListener('click', clearCanvas);

// listen for arrow keys
window.addEventListener('keydown', handlekey);

// draw function for drawing with mouse
function drawByClick(options) {
	console.log(options.key);
	// change the "hue" value by 1
	hue += 10;
	ctx.strokeStyle = `hsl(${Math.random() * 360},100%,50%)`;
	// start the drawing
	ctx.beginPath();
	ctx.moveTo(x, y);
	// change the value of x and y on the basis of user using switch
	switch (options.key) {
		case 'Arrowup':
			y -= MOVE_AMOUNT;
			break;

		case 'Arrowdown':
			y += MOVE_AMOUNT;
			break;

		case 'Arrowleft':
			x -= MOVE_AMOUNT;
			break;

		case 'Arrowright':
			x += MOVE_AMOUNT;
			break;

		default:
			break;
	}

	ctx.lineTo(x, y);
	ctx.stroke();
}

// handle button function
function handleButton(e) {
	console.log('button clicked');
	if (e.target.classList.value.includes('Arrow')) {
		drawByClick({ key: e.target.classList.value });
	}
}

// add event listner to up,down,left, right button
buttons.forEach(function (button) {
	button.addEventListener('click', handleButton);
});
