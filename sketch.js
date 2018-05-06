var ship;
var asteroids = [];
var explosion_particles = [];

function setup() {
    createCanvas(600, 600);
    ship = new Ship();
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
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
    return false;
}