;(function() {
    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    var mouse = {
        x: undefined,
        y: undefined
    };

    var colors = [
        '#f0f0f0',
        '#00cbeb',
        'steelblue',
        'tomato',
        'white'
    ];

    var circles = [];
    var totalCircles = 300;

    addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    // 	init();
    });

    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.originalRadius = this.radius;
        this.minRadius = radius;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.lineWidth = 2;
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
        };

        this.render = function() {
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            if((mouse.x - this.x < 50) && 
                 (mouse.x - this.x > -50) && 
                 (mouse.y - this.y < 50) && 
                 (mouse.y > this.y -50)) {
                if(this.radius < this.originalRadius * 3) {
                        this.radius += 1;
                }
            }
            else if(this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        }
    }

    function init() {
        circles = [];
        for(var i = 0; i < totalCircles; i++) {
            var radius = (Math.random() * 20) + 1;
            var x = Math.random() * (innerWidth - radius * 2) + radius;
            var y = Math.random() * (innerHeight - radius * 2) + radius;
            var dx = (Math.random() - 0.25);
            var dy = (Math.random() - 0.25);
            var circle = new Circle(x, y, dx, dy, radius);
            circles.push(circle)
        }	
    }

    function animate() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        requestAnimationFrame(animate);
        totalCircles.forEach(function(circle) {
            circle.render();
        });
    }

    init();
    animate();
    
})();
