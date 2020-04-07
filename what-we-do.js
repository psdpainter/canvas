;(function () {

    // https://jsbin.com/mixojologu/edit?js,output
    function create(node, html, css) {
        node = document.createElement(node);
        node.innerHTML = html;
        node.className = css;
        return node;
    }

    function createSVG(node, attrs) {
        node = document.createElementNS('http://www.w3.org/2000/svg', node);
        if(attrs != null) {
            for(var key in attrs) {
                if(attrs.hasOwnProperty(key)) {
                    node.setAttribute(key, attrs[key]);
                }
            }
        }
        return node;
    }

    function toRadians(d) {
        return d * Math.PI / 180;
    }

    var dial = document.querySelector('.dial');
    var box = dial.getBoundingClientRect();
    var icons = [{
        'name': 'automotive',
        'icon': 'dynetics-wwd-icon-automotive.svg',
        'display': 'Automotive'
    }, {
        'name': 'cyber-and-it-solutions',
        'icon': 'dynetics-wwd-icon-cyber-and-it-solutions.svg',
        'display': 'Cyber and IT Solutions'
    }, {
        'name': 'groundaware',
        'icon': 'dynetics-wwd-icon-groundaware.svg',
        'display': 'GroundAware'
    }, {
        'name': 'hypersonics',
        'icon': 'dynetics-wwd-icon-hypersonics.svg',
        'display': 'Hypersonics'
    }, {
        'name': 'intelligence',
        'icon': 'dynetics-wwd-icon-intelligence.svg',
        'display': 'Intelligence'
    }, {
        'name': 'radars-and-sensors',
        'icon': 'dynetics-wwd-icon-radars-and-sensors.svg',
        'display': 'Radars and Sensors'
    }, {
        'name': 'space-solutions',
        'icon': 'dynetics-wwd-icon-space-solutions.svg',
        'display': 'Space Solutions'
    }, {
        'name': 'strike-systems',
        'icon': 'dynetics-wwd-icon-strike-systems.svg',
        'display': 'Strike Systems'
    }, {
        'name': 'unmanned-systems',
        'icon': 'dynetics-wwd-icon-unmanned-systems.svg',
        'display': 'Unmanned Systems'
    }, {
        'name': 'weapons-technology',
        'icon': 'dynetics-wwd-icon-weapons-technology.svg',
        'display': 'Weapons Technology'
    }];

    // create root svg node
    var svg = createSVG('svg', {
        width: '100%',
        height: '100%', 
        viewBox: '0 0 ' + box.width + ' ' + box.height,
        preserveAspectRatio: 'xMidYMid meet'
    });

    // create outer circles
    var circles = [
        createSVG('circle', { cx: box.width / 2,  cy: box.height / 2,  r: box.height / 3, class: 'dial-circle' }),
        createSVG('circle', { cx: box.width / 2,  cy: box.height / 2,  r: box.height / 3 + 100, class: 'dial-circle' })
    ];

    var circleGroup = createSVG('g', { id: 'dial-circles' });

    circles.forEach(function(circle) {
        circleGroup.appendChild(circle);
    });

    svg.appendChild(circleGroup);

    // create containing groups
    var textGroup = createSVG('g', { id: 'dial-text' });
    var dotGroup = createSVG('g', { id: 'dial-dots' });
    var iconGroup = createSVG('g', { id: 'dial-icons' });
    var coinGroup = createSVG('g', { id: 'dial-coins' });
    var coinCircle = createSVG('circle', {
        cx: box.width / 2,
        cy: box.height / 2,
        r: box.height / 2 - 225,
        fill: 'none', 
        stroke: '#d0d0d0',
        'stroke-width': 2,
        class: 'dial-coin-stroke'
    });
    var coinBox = box.height / 2 - 125;
    coinGroup.appendChild(coinCircle);
    
    for(var d = 0; d < icons.length; d++) {
        var angle = 360 / icons.length;
        var cx = box.width / 2 + box.height / 3 * Math.cos(toRadians(d * angle));
        var cy = box.height / 2 + box.height / 3 * Math.sin(toRadians(d * angle));
        var r = 2;
        
        // dots
        var dg = createSVG('g');
        var dot = createSVG('circle', { cx: cx, cy: cy, r: r, class: 'circle-dot' });
        dg.appendChild(dot);
        dotGroup.appendChild(dg);

        // icon outlines
        var ig = createSVG('g', { class: 'g-icon', 'data-thrust': icons[d].name, 'data-display': icons[d].display });
        var iconOutline = createSVG('circle', { 
            cx: box.width / 2 + (box.height / 3 + 100) * Math.cos(toRadians(d * angle)), 
            cy: box.height / 2 + (box.height / 3 + 100) * Math.sin(toRadians(d * angle)), 
            r: 40, 
            class: 'circle-outline' 
        });
        ig.appendChild(iconOutline);   
        
        // icons
        var imgg = createSVG('g', { transform: 'translate(-35 -35)'});
        var icon = createSVG('image', {
            width: 70, 
            height: 70,
            x: box.width / 2 + (box.height / 3 + 100) * Math.cos(toRadians(d * angle)), 
            y: box.height / 2 + (box.height / 3 + 100) * Math.sin(toRadians(d * angle)), 
            href: '../assets/img/icons/'+ icons[d].icon
        });
        imgg.appendChild(icon);
        ig.appendChild(imgg);
        iconGroup.appendChild(ig);

        // coin group - or big display coin      
        var coinImageGroup = createSVG('g', { class: 'dial-coin-image-group ' + (d == 0 ? 'active' : 'inactive') });
        var coinImage = createSVG('image', {
            x: box.width / 2,
            y: box.height / 2,
            width: coinBox,
            height: coinBox,
            href: '../assets/img/icons/'+ icons[d].icon,
            transform: 'translate(-'+ coinBox / 2 + ' -' + coinBox / 2 +')',
            class: 'dial-coin-image'
        });
        coinImageGroup.appendChild(coinImage);
        coinGroup.appendChild(coinImageGroup);
    }
    
    svg.appendChild(textGroup);
    svg.appendChild(dotGroup);
    svg.appendChild(iconGroup);
    svg.appendChild(coinGroup);

    // append elements to dial
    dial.appendChild(svg);    

    gsap.set('.dial-coin-image-group.inactive', { 
        opacity: 0
    });

    // animate in the initial coin
    gsap.from('.dial-coin-image-group.active', { 
        duration: 2,
        delay: 0.6,
        opacity: 0,
        scale: 0,
        rotation: 90,
        transformOrigin: 'center',
        ease: 'elastic.inOut(0.8)'
    });

    // animate the dials and icons
    var dialCircleTimeline = gsap.timeline();
    dialCircleTimeline.from('.dial-coin-stroke', {
        duration: 2,
        delay: 0.6,
        opacity: 0,
        ease: 'expo.out',
        drawSVG: 0
    }).from('.dial-circle', {
        duration: 2,
        drawSVG: 0,
        ease: 'expo.out',
        stagger: {
            each: 0.3
        }
    },'<.2').from('.circle-dot', {
        duration: 1,
        scale: 0,
        ease: 'expo.out',
        stagger: {
            each: 0.03
        }
    }, '<=.06').from('.g-icon', {
        duration: 2,
        opacity: 0,
        scale: 0.5,
        transformOrigin: 'center',
        ease: 'expo',
        stagger: {
            each: 0.09
        }
    }, '<=2');

    var groupIcons = document.querySelectorAll('.g-icon');
    
    // add click event to each icon set and update background text
    [].forEach.call(groupIcons, function(g) {
        g.addEventListener('click', function(e) {
            var outline = this.querySelector('.circle-outline');
            var thrust = this.dataset.thrust;
            var display = this.dataset.display;
            
            // animates to the currently selected dial 
            // setDialPosition(thrust);

        });
    });

    var bgText = document.querySelector('.dial-background-text h1 .overflow');

    function animateDialBackgroundText(name) {
        // animate to the center position
    }

    function setDialPosition(name) {
        // reset all coins
        gsap.set('.dial-coin-icon-group', { class: 'inactive' });

        // set the current icon to active
        this.classList.add('active');
    }

    // create a neural grid
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // create a bunch of dots
    var grid = 10;
    
    function init() {
        // render polar grid lines
        for(var i = 0; i < icons.length; i++) {
            var angle = 360 / icons.length;
            var px = canvas.width / 2 + canvas.height * Math.cos(toRadians(i * angle));
            var py = canvas.height / 2 + canvas.height * Math.sin(toRadians(i * angle));
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(px, py);
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = '#d0d0d0';
            ctx.stroke();
            ctx.closePath();
        }
    }

    function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        init();
    }
    
    init();
    animate();

})();
