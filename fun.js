window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var maxParticles = 50;
var particles = [];
var hue = 183;

var colorPaused = false;

var mouse = {};

mouse.x = null;
mouse.y = null;

mouse.touches = function(e) {
    var touches = e.touches;
    if (touches) {
        mouse.x = touches[0].clientX;
        mouse.y = touches[0].clientY;
    } else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    e.preventDefault();
};

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function P() {}

P.prototype = {
    init: function() {
        this.x = mouse.x || w / 2;
        this.y = mouse.y || h / 2;
        this.color = "white";
        this.size = random(10, 40);
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.life = 0;
        this.maxLife = random(10, 100);
    },

    draw: function() {
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = "hsla(" + hue + ", 100%, 50%, .5)";
        ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, .3)";
        ctx.lineWidth = this.size / 20;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.update();
    },

    update: function() {

        if ((this.x < 0 || this.x + this.size > w) || (this.y + this.size < 0) || this.life > this.maxLife || this.size < .1) {
            this.init();
        } else {
            if (this.y + this.size >= h) {
                this.vy *= -1;
            }
            this.x += this.vx;
            this.y += this.vy;
            this.vy += .2;
            this.vx *= Math.random() > .5 ? -1 : 1;
            this.size *= .98;
            this.life++;

        }
    }
}

window.addEventListener("mousemove", mouse.touches);
window.addEventListener("touchstart", mouse.touches);
window.addEventListener("touchmove", mouse.touches);

window.addEventListener("mouseout", function() {
    mouse.x = mouse.y = null;
});

window.addEventListener("resize", function() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
});

c.addEventListener("click", function() {
    colorPaused = colorPaused ? false : true;
});

function setup() {
    for (var i = 0; i < maxParticles; i++) {

        setTimeout(function() {
            var p = new P();
            p.init();
            particles.push(p);
        }, i * 50)

    }
}

function anim() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "hsla(" + hue + ", 100%, 20%, .5)";
    ctx.fillRect(0, 0, w, h);

    for (var i in particles) {
        particles[i].draw();
    }

    if (!colorPaused) {
        hue += .5;
    }

    window.requestAnimationFrame(anim);
}

setup();
anim();