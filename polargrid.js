;(function() {

    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var circle = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    // utility radian/degree conversion functions
    function radians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function degrees(radians) {
        return radians * (180 / Math.PI);
    }

    function getDistance(x1, y1, x2, y2) {
        var xdistance = x2 - x1;
        var ydistance = y2 - y1;
        return Math.sqrt(Math.pow(xdistance, 2) + Math.pow(ydistance, 2));
    }

    // draw innermost circle
    function renderInnerCircle() {
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2, canvas.height / 4, 0, Math.PI * 2, false);
        c.strokeStyle = '#dbdcdd';
        c.stroke();
        c.closePath();
    }

    // draw second circle
    function renderMiddleCircle() {
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2.5, 0, Math.PI * 2, false);
        c.strokeStyle = '#dbdcdd';
        c.stroke();
        c.closePath();
    }

    // draw circle with center-aligned stroke
    function renderPolarGridLines() {        
        for (var i = 0; i < 12; i++) {
            var x = circle.x + circle.y * Math.cos(radians(i * 30));
            var y = circle.y + circle.y * Math.sin(radians(i * 30));
            c.beginPath();
            c.moveTo(circle.x, circle.y);
            c.lineTo(x, y);
            c.strokeStyle = '#dbdcdd';
            c.stroke();
            c.closePath();
        }
    }

    function renderPolarGrid(radius, offset) {
        for(var i = 0; i < 360; i++) {
            var x1 = circle.x + radius * Math.cos(radians(i));
            var y1 = circle.y + radius * Math.sin(radians(i));
            var x2 = circle.x + (radius + Math.cos(radians(i)) - offset) * Math.cos(radians(i));
            var y2 = circle.y + (radius + Math.sin(radians(i)) - offset) * Math.sin(radians(i));
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.strokeStyle = '#0068b0';
            c.stroke();
            c.closePath();
        }
    }

    renderPolarGrid(canvas.width / 3, 40);
    
})();
