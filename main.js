
var
canvas,
ctx,
width,
height;

function main() {
	width = window.innerWidth;
	height = window.innerHeight;
	
	canvas = document.createElement("canvas");
	canvas.style.border = "1px solid #000";
	canvas.width = width;
	canvas.height = height;
	
	initSprites();
	
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	console.log("omg hi");
	loop();
}

function loop() {
	var loop = function() {
		render();
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}

function render() {
	foodbowl.draw(ctx);
}

