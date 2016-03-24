var

textrenderer,
foodbowl


;


function initGame() {
	var foodbowldim = constants.foodbowl;
	foodbowl = new FoodBowl(foodbowldim.x, foodbowldim.y, foodbowldim.width, foodbowldim.height);
	
	textrenderer = new EffectsTextPool();
	textrenderer.spawnText("+1", 200, 200, constants.font.displaydim.width, constants.font.displaydim.height);
	textrenderer.spawnText("23", 250, 200, constants.font.displaydim.width, constants.font.displaydim.height);
}

document.onclick = function(e) {
	var mousePos = getMousePos(e);
	//textrenderer.spawnText("+1", mousePos.x, mousePos.y, constants.font.displaydim.width, constants.font.displaydim.height);
	foodbowl.incrementFoodCount(counter);
	display();
}

function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
	x: e.clientX - rect.left,
	y: e.clientY - rect.top
	}
}


























