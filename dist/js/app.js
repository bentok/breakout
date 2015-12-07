'use strict';

(function () {
	'use strict';

	var canvas = document.getElementById('myCanvas'),
	    ctx = canvas.getContext('2d');

	// Ball settings
	var x = canvas.width / 2,
	    y = canvas.height - 30,
	    dx = 2,
	    dy = -2,
	    ballRadius = 10;

	// Paddle settings
	var paddleHeight = 10,
	    paddleWidth = 75,
	    paddleX = (canvas.width - paddleWidth) / 2,
	    paddleY = canvas.height - paddleHeight;

	// Control settings
	var rightPressed = false,
	    leftPressed = false;

	animate();

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Redraw ball on each frame
		drawBall();
		drawPaddle();

		// Reverse direction when ball hits a boundary
		if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}

		// Move paddle on keypress
		if (rightPressed && paddleX < canvas.width - paddleWidth) {
			paddleX += 7;
		} else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}

		// Ball motion
		y += dy;
		x += dx;
	}

	// Canvas rendering of ball
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	// Canvas rendering of paddle
	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
		ctx.fillStyle = '#0095DD';
		ctx.fill();
		ctx.closePath();
	}

	// Watch for keypress events to move paddle
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function keyDownHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = true;
		} else if (e.keyCode == 37) {
			leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = false;
		} else if (e.keyCode == 37) {
			leftPressed = false;
		}
	}

	// Animation loop
	function animate() {
		setInterval(draw, 10);
	}
})();