function ProgressBar(initialVal, maxVal){
	this.currentVal = initialVal;

	function increment(amount){
		this.currentVal += amount;
	}

	function decrement(amount){
		this.currentVal -= amount;
	}

}

ProgressBar.prototype = new Drawable();
ProgressBar.prototype.draw = function(){

}

