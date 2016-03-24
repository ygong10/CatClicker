

function ProgressBar(initialVal, maxVal, x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	var currentVal = initialVal;
	var maxVal = maxVal;
	var background = new Sprite(imageRepository.progressbar_b, x, y, width, height);
	var bar_x = x - 2;
	var bar_y = y + 3;
	var bar_w = width - 17;
	var bar_h = height - 5;
	var bar = new ClippedSprite(imageRepository.progressbar_i, 0, 0, 0, height, x-2, y+3, 0, height-5);

	this.increment = function(amount){
		currentVal += amount;
		/*
		if (currentVal > maxVal)
			currentVal = maxVal;
		else if (currentVal == maxVal)
			return true;
		*/
		var ratio = currentVal / maxVal;
		bar.swidth = ratio * bar_w;
		bar.width = ratio * bar_w;
		console.log("incremented to " + ratio + " " + bar.swidth);
	}

	this.decrement = function(amount){
		currentVal -= amount;
		if (currentVal <= 0)
			return true;
		
		bar.swidth = currentVal / maxVal * width;
	}
	
	this.draw = function(ctx) {
		background.draw(ctx);
		bar.draw(ctx);
	}
}
ProgressBar.prototype = new Drawable();

