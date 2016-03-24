var counter = 0;
var oldTime = new Date();

function increment(){
	counter++;
	document.getElementById('cat_number').innerHTML =  counter
}

function display(){
	var currentTime = new Date();
	var timeDifference = currentTime.getTime() - oldTime.getTime() 
	document.getElementById('time').innerHTML = timeDifference/1000;
	document.getElementById('cat_number').innerHTML =  counter;
}


function startTimer(){
	var oldTime = new Date();
}















