(function(){
	'use strict';

	const canvas = document.getElementById('myCanvas'),
				ctx = canvas.getContext('2d');
			
	// Ball settings
	let x = canvas.width/2,
			y = canvas.height-30,
			dx = 2,
			dy = -2,
			ballRadius = 10;
			
	animate();
	
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
		
		y += dy;
		x += dx;
	}
	
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}
	
	function animate() {
		setInterval(draw, 10);
	}

})();

