'use strict';

(function () {
	'use strict';

	var CANVAS = document.getElementById('myCanvas'),
	    CTX = CANVAS.getContext('2d');

	// Global settings
	var color = '#0095DD';

	// Ball settings
	var x = CANVAS.width / 2,
	    y = CANVAS.height - 30,
	    dx = 3,
	    dy = -3,
	    ballRadius = 10;

	// Paddle settings
	var paddleHeight = 10,
	    paddleWidth = 75,
	    paddleX = (CANVAS.width - paddleWidth) / 2,
	    paddleY = CANVAS.height - paddleHeight;

	// Control settings
	var rightPressed = false,
	    leftPressed = false;

	// Brick settings
	var brickRowCount = 3,
	    brickColumnCount = 5,
	    brickWidth = 75,
	    brickHeight = 20,
	    brickPadding = 10,
	    brickOffsetTop = 30,
	    brickOffsetLeft = 30,
	    bricks = [];

	// Score settings
	var score = 0;

	// Player Options
	var hardMode = true;

	// Draw bricks and animate
	generateBricks();
	draw();

	function draw() {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); // Redraw ball on each frame
		drawBall();
		drawPaddle();
		drawBricks();
		collisionDetection();
		drawScore();

		// Reverse direction when ball hits a boundary
		if (x + dx > CANVAS.width - ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if (y + dy < ballRadius) {
			dy = -dy;
		} else if (y + dy > CANVAS.height - ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
				if (hardMode) {
					dx = dx * 1.05; // speed up ball when it hits the paddle
					dy = dy * 1.05; // speed up ball when it hits the paddle
				}
			} else {
					alert('GAME OVER');
					document.location.reload();
				}
		}

		// Move paddle on keypress
		if (rightPressed && paddleX < CANVAS.width - paddleWidth) {
			paddleX += 7;
		} else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}

		// Ball motion
		y += dy;
		x += dx;

		// Animation loop
		requestAnimationFrame(draw);
	}

	// Canvas rendering of ball
	function drawBall() {
		CTX.beginPath();
		CTX.arc(x, y, ballRadius, 0, Math.PI * 2);
		CTX.fillStyle = color;
		CTX.fill();
		CTX.closePath();
	}

	// Canvas rendering of paddle
	function drawPaddle() {
		CTX.beginPath();
		CTX.rect(paddleX, paddleY, paddleWidth, paddleHeight);
		CTX.fillStyle = color;
		CTX.fill();
		CTX.closePath();
	}

	// Draw bricks
	function drawBricks() {
		for (var i = 0; i < brickColumnCount; i++) {
			for (var j = 0; j < brickRowCount; j++) {
				// Only draw bricks if they have not been touched as indicated by "status"
				if (bricks[i][j].status === 1) {
					var brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
					var brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
					bricks[i][j].x = brickX;
					bricks[i][j].y = brickY;
					CTX.beginPath();
					CTX.rect(brickX, brickY, brickWidth, brickHeight);
					CTX.fillStyle = color;
					CTX.fill();
					CTX.closePath();
				}
			}
		}
	}

	// Watch for keypress events to move paddle
	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);

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
	function mouseMoveHandler(e) {
		var relativeX = e.clientX - CANVAS.offsetLeft;
		if (relativeX > 0 && relativeX < CANVAS.width) {
			paddleX = relativeX - paddleWidth / 2;
		}
	}

	// Fill bricks array according to rows and columns in the brick settings variables
	function generateBricks() {
		for (var i = 0; i < brickColumnCount; i++) {
			bricks[i] = [];
			for (var j = 0; j < brickRowCount; j++) {
				bricks[i][j] = {
					x: 0,
					y: 0,
					status: 1
				};
			}
		}
	}

	// Collision detection
	function collisionDetection() {
		for (var i = 0; i < brickColumnCount; i++) {
			for (var j = 0; j < brickRowCount; j++) {
				var brick = bricks[i][j];
				if (brick.status === 1) {
					if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
						dy = -dy; // Reverse direction
						brick.status = 0; // Remove brick
						score++;
						if (score == brickRowCount * brickColumnCount) {
							alert('YOU WIN, CONGRATULATIONS!');
							document.location.reload();
						}
					}
				}
			}
		}
	}

	// Displaying the score
	function drawScore() {
		CTX.font = '16px Arial';
		CTX.fillStyle = color;
		CTX.fillText('Score: ' + score, 8, 20);
	}
})();