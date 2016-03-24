
var
canvas,
ctx,
width,
height
;

function init() {
	width = window.innerWidth;
	height = window.innerHeight;
	
	canvas = document.createElement("canvas");
	canvas.style.border = "1px solid #000";
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas);
	
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	
	initGame();
	
	console.log("omg hi");
	loop();
}

function loop() {
	var loop = function() {
		update();
		render();
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}

function update() {
	
}

function render() {
	ctx.clearRect(0, 0, width, height);
	foodbowl.draw(ctx);
	textrenderer.render(ctx);
}

