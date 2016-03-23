var
foodbowl;

function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function initSprites() {
	var foodbowl_img = new Image();
	foodbowl_img.src = "imgs/foodbowl.png";
	foodbowl = new Sprite(foodbowl_img, 30, 30, 50, 50);
}

