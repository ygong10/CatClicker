var

constants = {
	foodbowl: {width: 100, height: 100, x: 450, y: 300},
	font: {
		displaydim: {width: 20, height: 25},
		dimensions: {swidth: 18, sheight: 16},
		indices: {
			excl:	[0, 1],		star:	[0, 2],		plus:	[0, 3],		comma:	[0, 4],
			minus:	[0, 5],		peri:	[0, 6],		fslash:	[0, 7],		zero:	[0, 8],
			one:	[1, 0],		two:	[1, 1],		three:	[1, 2],		apos:	[1, 3],
			four:	[1, 4],		five:	[1, 5],		six:	[1, 6],		seven:	[1, 7],
			eight:	[1, 8],		nine:	[2, 0],		colon:	[2, 1],		semic:	[2, 2],
			less:	[2, 3],		equal:	[2, 4],		sharp:	[2, 5],		grter:	[2, 6],
			qstn:	[2, 7],		at:		[2, 8],		a:		[3, 0],		b:		[3, 1],
			c:		[3, 2],		d:		[3, 3],		e:		[3, 4],		f:		[3, 5],
			g:		[3, 6],		dolla:	[3, 7],		h:		[3, 8],		i:		[4, 0],
			j:		[4, 1],		k:		[4, 2],		l:		[4, 3],		m:		[4, 4],
			n:		[4, 5],		o:		[4, 6],		p:		[4, 7],		q:		[4, 8],
			perc:	[5, 0],		r:		[5, 1],		s:		[5, 2],		t:		[5, 3],
			u:		[5, 4],		v:		[5, 5],		w:		[5, 6],		x:		[5, 7],
			y:		[5, 8],		z:		[6, 0],		space:	[0, 0],
		},
		animationLength: 50
	}
}

imageRepository = new function() {
	this.foodbowl = new Image();
	this.fontmap = new Image();
	
	var numImages = 2;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded == numImages) {
			window.init();
		}
	}
	this.foodbowl.onload = this.fontmap.onload = imageLoaded;
	
	this.foodbowl.src = "imgs/foodbowl.png";
	this.fontmap.src = "font/fontmap.png";
}
;

function Drawable(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function(ctx) {}
}




function Sprite(img, x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	this.image = img;
	
	this.draw = function(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}
Sprite.prototype = new Drawable();




function ClippedSprite(img, sx, sy, swidth, sheight, x, y, width, height) {
	Sprite.call(this, img, x, y, width, height);
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	
	this.draw = function(ctx) {
		ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	}	
}
ClippedSprite.prototype = new Sprite();




function TextSprite(text, x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	this.text = text;
	this.len = text.length;
	this.animlen = constants.font.animationLength;
	this.counter = this.animlen;
	
	// Width and height applies to each character
	this.chars = text.split("");
	this.sprites = [];
	for (var i = 0; i < text.length; i++) {
		var ind = posForLetter(this.chars[i]);
		var swidth = constants.font.dimensions.swidth;
		var sheight = constants.font.dimensions.sheight;
		this.sprites[i] = new ClippedSprite(imageRepository.fontmap, ind[1] * swidth + 1 , ind[0] * sheight + 1, swidth - 1, sheight - 1,
			this.x + i * this.width, this.y, this.width, this.height);
	}
	
	this.moveBy = function(dx, dy) {
		for (var i = 0; i < this.len; i++) {
			this.sprites[i].x += dx;
			this.sprites[i].y += dy;
		}
		this.x += dx;
		this.y += dy;
	}
	
	this.draw = function(ctx) {
		ctx.save();
		var alpha = this.counter / this.animlen;
		ctx.globalAlpha = alpha;
		for (i = 0; i < this.len; i++) {
			this.sprites[i].draw(ctx);
		}
		ctx.restore();
	}
	
	this.update = function() {
		if (this.counter == 0) {
			return true;
		}
		this.moveBy(0, -1);
		this.counter--;
	}
}
TextSprite.prototype = new Drawable();




function EffectsTextPool() {
	//var maxSize = maxSize;
	var size = 0;
	var pool = [];
	
	this.spawnText = function(text, x, y, width, height) {
		var text = new TextSprite(text, x, y, width, height);
		pool[size] = text;
		size++;
		//console.log("size is " + size);
	}
	
	this.render = function(ctx) {
		for (var i = 0; i < size; i++) {
			var sprite = pool[i];
			if (sprite.update()) {
				pool.splice(i, 1);
				size--;
				i--;
			} else {
				sprite.draw(ctx);
			}
		}
	}
}



function FoodBowl(x, y, width, height) {
	Drawable.call(this, x, y, width, height);
	this.foodcount = 0;
	this.text = "food: ";
	this.foodbowl = new Sprite(imageRepository.foodbowl, x, y, width, height);
	this.textspawnpoint = {x: this.x + this.width / 2, y: this.y};
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.font = "24px Comic Sans MS";
		ctx.fillStyle = "brown";
		ctx.textAlign = "center";
		ctx.fillText(this.text + this.foodcount, this.x + this.width / 2, this.y - 30);
		this.foodbowl.draw(ctx);
		ctx.restore();
	}
	
	this.incrementFoodCount = function(amount) {
		this.foodcount += amount;
		textrenderer.spawnText("+" + amount, this.textspawnpoint.x, this.textspawnpoint.y, constants.font.displaydim.width, constants.font.displaydim.height);
	}
	
	this.setFoodCount = function(amount) {
		this.foodcount = amount;
	}
}
FoodBowl.prototype = new Drawable();





function posForLetter(letter) {
	switch(letter) {
		case ' ':
			return constants.font.indices.space;
		case '+':
			return constants.font.indices.plus;
		case '-':
			return constants.font.indices.minus;
		case 'a':
			return constants.font.indices.a;
		case 'b':
			return constants.font.indices.b;
		case 'c':
			return constants.font.indices.c;
		case 'd':
			return constants.font.indices.d;
		case 'e':
			return constants.font.indices.e;
		case 'f':
			return constants.font.indices.f;
		case 'g':
			return constants.font.indices.g;
		case 'h':
			return constants.font.indices.h;
		case 'i':
			return constants.font.indices.i;
		case 'j':
			return constants.font.indices.j;
		case 'k':
			return constants.font.indices.k;
		case 'l':
			return constants.font.indices.l;
		case 'm':
			return constants.font.indices.m;
		case 'n':
			return constants.font.indices.n;
		case 'o':
			return constants.font.indices.o;
		case 'p':
			return constants.font.indices.p;
		case 'q':
			return constants.font.indices.q;
		case 'r':
			return constants.font.indices.r;
		case 's':
			return constants.font.indices.s;
		case 't':
			return constants.font.indices.t;
		case 'u':
			return constants.font.indices.u;
		case 'v':
			return constants.font.indices.v;
		case 'w':
			return constants.font.indices.w;
		case 'x':
			return constants.font.indices.x;
		case 'y':
			return constants.font.indices.y;
		case 'z':
			return constants.font.indices.z;
		case '0':
			return constants.font.indices.zero;
		case '1':
			return constants.font.indices.one;
		case '2':
			return constants.font.indices.two;
		case '3':
			return constants.font.indices.three;
		case '4':
			return constants.font.indices.four;
		case '5':
			return constants.font.indices.five;
		case '6':
			return constants.font.indices.six;
		case '7':
			return constants.font.indices.seven;
		case '8':
			return constants.font.indices.eight;
		case '9':
			return constants.font.indices.nine;
	}
}




