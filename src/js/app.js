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
			
	// Paddle settings
	let paddleHeight = 10,
			paddleWidth = 75,
			paddleX = (canvas.width - paddleWidth)/2,
			paddleY = canvas.height - paddleHeight;
			
	// Control settings
	let rightPressed = false,
			leftPressed = false;
			
	// Brick settings
	let brickRowCount = 3,
			brickColumnCount = 5,
			brickWidth = 75,
			brickHeight = 20,
			brickPadding = 10,
			brickOffsetTop = 30,
			brickOffsetLeft = 30,
			bricks = [];
			
	// Score settings
	let score = 0;
	
			
	animate();
	generateBricks();
	
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Redraw ball on each frame
		drawBall();
		drawPaddle();
		drawBricks();
		collisionDetection();
		drawScore();
		
		// Reverse direction when ball hits a boundary
		if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if (y + dy < ballRadius) {
			dy = -dy;
		} else if (y + dy > canvas.height-ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
				// dx = dx * 1.05;  // speed up ball when it hits the paddle
				// dy = dy * 1.05;  // speed up ball when it hits the paddle
			}
			else {
				alert('GAME OVER');
				document.location.reload();
			}
		}
		
		// Move paddle on keypress
		if (rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
		}
		else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
		
		// Ball motion
		y += dy;
		x += dx;
	}
	
	// Canvas rendering of ball
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
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
	
	// Draw bricks 
	function drawBricks() {
		for (let i = 0; i < brickColumnCount; i++) {
			for (let j = 0; j < brickRowCount; j++) {
				// Only draw bricks if they have not been touched as indicated by "status"
				if (bricks[i][j].status === 1) {
					let brickX = (i * (brickWidth+brickPadding)) + brickOffsetLeft;
					let brickY = (j * (brickHeight+brickPadding)) + brickOffsetTop;
					bricks[i][j].x = brickX;
					bricks[i][j].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = '#0095DD';
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	
	// Watch for keypress events to move paddle
	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);
	
	function keyDownHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = true;
		}
		else if (e.keyCode == 37) {
			leftPressed = true;
		}
	}
	function keyUpHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = false;
		}
		else if (e.keyCode == 37) {
			leftPressed = false;
		}
	}
	
	// Animation loop
	function animate() {
		setInterval(draw, 10);
	}
	
	// Fill bricks array according to rows and columns in the brick settings variables
	function generateBricks() {
		for (let i = 0; i < brickColumnCount; i++) {
			bricks[i] = [];
			for (let j = 0; j < brickRowCount; j++) {
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
		for (let i = 0; i < brickColumnCount; i++) {
			for (let j = 0; j < brickRowCount; j++) {
				var brick = bricks[i][j];
				if (brick.status === 1) {
					if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
						dy = -dy; // Reverse direction
						brick.status = 0; // Remove brick
						score++;
						if(score == brickRowCount*brickColumnCount) {
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
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Score: ' + score, 8, 20);
	}

})();

