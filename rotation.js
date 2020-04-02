var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function Ball(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.radians = 0;
	this.velocity = 0.05;
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
	
	this.update = function() {
		this.radians += this.velocity;
		this.x = x + Math.cos(this.radians) * 100;
		this.y = y + Math.sin(this.radians) * 100;
		this.draw();
	}
}

var balls = [];

function init(num) {
	balls = [];
	for(var i = 0; i < num; i++) {
		var ball = new Ball(canvas.width / 2, canvas.height / 2, 20, 'blue');
		balls.push(ball);
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	balls.forEach(function(ball) {
		ball.update();
	});
}

init();
animate();
