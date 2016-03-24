var

textrenderer,
catrenderer,
progressbar,
foodbowl,
cat1

;


function initGame() {
	var foodbowldim = constants.foodbowl;
	foodbowl = new FoodBowl(foodbowldim.x, foodbowldim.y, foodbowldim.width, foodbowldim.height);
	cat1 = new Cat(100, 140, 350, 350 * 360 / 500);
	//progressbar = new ProgressBar(0, 100, 50, 50, 400, 100);
	
	textrenderer = new EffectsTextPool();
}

document.onclick = function(e) {
	var mousePos = getMousePos(e);
	//textrenderer.spawnText("+1", mousePos.x, mousePos.y, constants.font.displaydim.width, constants.font.displaydim.height);
	foodbowl.incrementFoodCount(counter);
	//progressbar.increment(5);
	display();
}

function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
	x: e.clientX - rect.left,
	y: e.clientY - rect.top
	}
}











function FoodBowl(x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	this.foodbowl = new Sprite(imageRepository.foodbowl, x, y, width, height);
	this.foodcount = 0;
	this.text = "food: ";
	this.textspawnpoint = {x: this.x + this.width / 2 + 5, y: this.y};
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.font = "24px Comic Sans MS";
		ctx.fillStyle = "brown"
		ctx.textAlign = "center";
		ctx.fillText(this.text + this.foodcount, this.x + this.width / 2, this.y - 30);
		this.foodbowl.draw(ctx);
		ctx.restore();
	}
	
	this.incrementFoodCount = function(amount) {
		this.foodcount += amount;
		textrenderer.spawnText("+" + amount, this.textspawnpoint.x, this.textspawnpoint.y, constants.font.displaydim.width, constants.font.displaydim.height);
	}
	
	this.decrementFoodCount = function(amount) {
		this.foodcount -= amount;
		textrenderer.spawnText("-" + amount, this.textspawnpoint.x - 55, this.textspawnpoint.y + 15, constants.font.displaydim.width, constants.font.displaydim.height);
	}
	
	this.setFoodCount = function(amount) {
		this.foodcount = amount;
	}
}
FoodBowl.prototype = new Drawable();




function Cat(x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	this.catsprite = new Sprite(imageRepository.cat1, x, y, width, height);
	this.fullness = 0;
	this.text = "fullness: ";
	this.textspawnpoint = {x: this.x + this.width / 2, y: this.y};
	
	this.increaseFullness = function(amount) {
		this.fullness += amount;
		textrenderer.spawnText("+" + amount, this.textspawnpoint.x, this.textspawnpoint.y, constants.font.displaydim.width, constants.font.displaydim.height);
	}
	
	this.setFullness = function(amount) {
		this.fullness = amount;
	}
	
	this.update = function() {
		if (foodbowl.foodcount > 0) {
			var foods = foodbowl.foodcount;
			this.increaseFullness(foods);
			foodbowl.decrementFoodCount(foods);
		}
	}
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.font = "24px Comic Sans MS";
		ctx.fillStyle = "brown"
		ctx.textAlign = "center";
		ctx.fillText(this.text + this.fullness, this.x + this.width / 2, this.y - 30);
		this.catsprite.draw(ctx);
		ctx.restore();
	}
}
Cat.prototype = new Sprite();










