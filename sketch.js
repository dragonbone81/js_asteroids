var ship;
var health_bar;
var asteroids = [];
var explosion_particles = [];
var power_ups = [];
var scoreElem;
var newGameElem;
var score = 0;
var shooting_sound;
var explosion_sound;
var thrusting_sound;
var high_scores_data = [];
var aliens = [];
var new_game = true;
var interval;

function setup() {
    createCanvas(600, 600);
    newGameElem = createDiv('Press Space to start');
    newGameElem.position(width / 2 - 150, height / 2 + 30);
    newGameElem.id = 'new_game';
    newGameElem.style('color', 'white');
    newGameElem.style('font-size', '40px');
    reset();
}

function reset() {
    if (!scoreElem) {
        scoreElem = createDiv('Score = 0');
        scoreElem.position(20, 20);
        scoreElem.id = 'score';
        scoreElem.style('color', 'white');
        get_high_scores();
    } else {
        score = 0;
        scoreElem.html("Score = " + score);
    }

    asteroids = [];
    clearInterval(interval);
    Alien.started = false;
    aliens = [];
    explosion_particles = [];
    power_ups = [];
    ship = new Ship();
    health_bar = new HealthBar();
    add_asteroids(5);
}

function add_asteroids(count) {
    if (asteroids.length < 10) {
        for (var i = 0; i < count; i++) {
            asteroids.push(new Asteroid(null, null, 150));
        }
    }
}

function draw() {
    background(0);
    asteroids = asteroids.filter(function (asteroid) {
        return !(asteroid.delete);
    });
    asteroids.forEach(function (asteroid) {
        asteroid.render();
    });
    explosion_particles = explosion_particles.filter(function (particle) {
        return !(particle.delete);
    });
    explosion_particles = explosion_particles.splice(explosion_particles.length - min(explosion_particles.length, 100), explosion_particles.length);
    explosion_particles.forEach(function (particle) {
        particle.render();
    });
    power_ups = power_ups.filter(function (power_up) {
        return !(power_up.delete);
    });
    power_ups.forEach(function (power_up) {
        power_up.render();
    });
    aliens = aliens.filter(function (alien) {
        return !(alien.delete);
    });
    aliens.forEach(function (alien) {
        alien.render();
    });
    ship.render();
    if (ship.crash && !ship.exploding) {
        ship.explode();
        save_high_score(score);
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
    health_bar.render();
    if (score >= 100 && !Alien.started)
        add_aliens();

}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        ship.rotating_right = false;
    }
    if (keyCode === UP_ARROW) {
        ship.thrusting = false;
    }
    if (keyCode === 17) {
        ship.shooting = false;
    }
    if (keyCode === LEFT_ARROW) {
        ship.rotating_left = false;
    }
    return false;
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW && !new_game) {
        ship.rotating_right = true;
    }
    if (keyCode === UP_ARROW && !new_game) {
        ship.thrusting = true;
    }
    if (keyCode === 17 && !new_game) {
        ship.shooting = true;
    }
    if (keyCode === 32 && new_game) {
        new_game = false;
        newGameElem.remove();
        shooting_sound = loadSound('fire.wav');
        shooting_sound.setVolume(0.3);
        explosion_sound = loadSound('explosion.wav');
        explosion_sound.setVolume(0.4);
        thrusting_sound = loadSound('thrust.wav');
        thrusting_sound.setVolume(0.05);
        reset();
    }
    if (keyCode === LEFT_ARROW && !new_game) {
        ship.rotating_left = true;
    }
    if (keyCode === RIGHT_ARROW && !new_game) {
        ship.rotating_right = true;
    }

    return false;
}

function get_high_scores() {
    var high_scores = document.getElementById('high_scores_list');
    axios.get('https://api.myjson.com/bins/1dnf82').then(function (response) {
        high_scores_data = response.data.high_scores;
        high_scores_data.sort(function (a, b) {
            return (a.high_score > b.high_score) ? -1 : ((b.high_score > a.high_score) ? 1 : 0);
        });
        high_scores.textContent = "";
        for (var i = 0; i < high_scores_data.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(high_scores_data[i].username + " : " + high_scores_data[i].high_score));
            high_scores.appendChild(li);
        }
    });
}

function save_high_score(score) {
    if (score >= 5) {
        high_scores_data.push({username: 'anonymous', high_score: score});
        high_scores_data.sort(function (a, b) {
            return (a.high_score > b.high_score) ? -1 : ((b.high_score > a.high_score) ? 1 : 0);
        });
        axios.put('https://api.myjson.com/bins/1dnf82', {high_scores: high_scores_data.slice(0, 15)}).then(function (response) {
            if (response.status === 200 && response.statusText === "OK") {
                setTimeout(function () {
                    get_high_scores();
                }, 300);
            }
        });
    }
}

function add_score(score_amount) {
    ship.power += score_amount / 100;
    score += score_amount;
    scoreElem.html("Score = " + score);
}

function add_aliens() {
    Alien.started = true;
    interval = setInterval(function () {
        aliens.push(new Alien())
    }, 10000);
}