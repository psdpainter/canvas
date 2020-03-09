(function() {
    var canvas = document.querySelector('#sinewave');
    var c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = 'rgba(255, 255, 255, 0.0)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    var wave = {
        y: canvas.height / 2,
        length: 0.005,
        amplitude: 120,
        startingFrequency: 180,
        frequency: 0.03
    };

    var increment = wave.startingFrequency;

    function animate() {
        window.requestAnimationFrame(animate);
        c.fillStyle = 'rgba(255, 255, 255, .03)';
        c.fillRect(0, 0, canvas.width, canvas.height);

        c.beginPath();
        c.moveTo(0, canvas.height / 2);

        for(var i = 0; i < canvas.width; i++) {
            c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
        }

        c.strokeStyle = 'hsla(205, 100%, 35%, .7)';
        c.stroke();
        increment += wave.frequency;
    }

    animate();

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
    });

})();
