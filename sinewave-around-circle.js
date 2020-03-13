;(function() {

    var canvas = document.querySelector('canvas');
    var c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function renderReferenceCircle() {
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2, 250, 0, Math.PI * 2, false);
        c.strokeStyle = '#d0d0d0';
        c.lineWidth = 2;
        c.stroke();
        c.closePath();
    }

    function radians(angle) {
        return angle * Math.PI / 180;
    }

    function random(min, max) {
        return Math.round((Math.random() *(Math.abs(max - min))) + min);
     }

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    
    // radius + amplitude should equal the total radius of the reference circle
    var radius = 240;
    var amplitude = 10;
    
    // the total number of sinewaves that should be rendered
    var sines = 10;

    function renderSinewave() {
        c.beginPath();
    
        for(var i = 0; i < 360; i++) {
            var angle = radians(i);
            var x = cx + (radius + amplitude * Math.sin(sines * angle)) * Math.sin(angle);
            var y = cy + (radius + amplitude * Math.sin(sines * angle)) * Math.cos(angle);
            c.lineTo(x, y);
        }
    
        c.strokeStyle = 'red';
        c.lineWidth = 2;
        c.stroke();
        c.closePath();
    }

    function init() {
        renderReferenceCircle();
        renderSinewave();
    }

    init();

})();
