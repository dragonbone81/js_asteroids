var ship;
var asteroids = [];
var explosion_particles = [];
var scoreElem;
var score = 0;
var shooting_sound;
var explosion_sound;

function setup() {
    createCanvas(600, 600);
    reset();
}

function preload() {
    shooting_sound = loadSound('gun.wav');
    shooting_sound.setVolume(0.3);
    explosion_sound = loadSound('explosion.wav');
    explosion_sound.setVolume(0.3);
}

function reset() {
    if (!scoreElem) {
        scoreElem = createDiv('Score = 0');
        scoreElem.position(20, 20);
        scoreElem.id = 'score';
        scoreElem.style('color', 'white');
    } else {
        score = 0;
        scoreElem.html("Score = " + score);
    }


    asteroids = [];
    explosion_particles = [];
    ship = new Ship();
    add_asteroids(5);
}

function add_asteroids(count) {
    for (var i = 0; i < count; i++) {
        asteroids.push(new Asteroid(null, null, 150));
    }
}

function draw() {

    background(0);
    ship.render();
    asteroids = asteroids.filter(function (asteroid) {
        return !(asteroid.delete);
    });
    asteroids.forEach(function (asteroid) {
        asteroid.render();
    });
    explosion_particles = explosion_particles.filter(function (particle) {
        return !(particle.delete);
    });
    explosion_particles.forEach(function (particle) {
        particle.render();
    });
    if (ship.crash && !ship.exploding) {
        ship.explode();
        setTimeout(function () {
            reset();
        }, 1000);
        asteroids.forEach(function (asteroid) {
            asteroid.velocity.x = 0;
            asteroid.velocity.y = 0;
        });
        ship.hide();
        ship.crash = false;
        ship.exploding = true;
    }


}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        ship.rotating_right = false;
    }
    if (keyCode === LEFT_ARROW) {
        ship.rotating_left = false;
    }
    if (keyCode === UP_ARROW) {
        ship.thrusting = false;
    }
    if (key === ' ') {
        ship.shooting = false;
    }
    return false;
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.rotating_right = true;
    }
    if (keyCode === LEFT_ARROW) {
        ship.rotating_left = true;
    }
    if (keyCode === UP_ARROW) {
        ship.thrusting = true;
    }
    if (key === ' ') {
        ship.shooting = true;
    }
    if (keyCode === 82) {
        reset();
    }
    return false;
}