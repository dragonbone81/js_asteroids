function Alien() {
    this.r = 40;
    this.shooting_time = 20;
    this.direction = '';
    this.time_in_direction = 0;
    this.dirs = ['down', 'up'];
    this.delete = false;
    this.position = createVector(0 - this.r, random(height / 4, height / 2 + height / 4));
    this.x_way = 1;
    this.health = map(20, 0, 100, 0, score);
    this.render = function () {
        this.edges();
        push();
        translate(this.position);
        fill(0);
        stroke(255);
        beginShape();
        vertex((-(this.r) + (this.r * 0.6)) / 1.5, this.r / 3);
        vertex((-(this.r) + (this.r * 0.2)) / 1.5, this.r / 10);
        vertex((-(this.r) + (this.r * 0.5)) / 1.5, 0);
        vertex((-(this.r) + (this.r * 0.6)) / 1.5, -this.r / 5);
        vertex(((this.r) - (this.r * 0.6)) / 1.5, -this.r / 5);
        vertex(((this.r) - (this.r * 0.5)) / 1.5, 0);
        vertex(((this.r) - (this.r * 0.2)) / 1.5, this.r / 10);
        vertex(((this.r) - (this.r * 0.6)) / 1.5, this.r / 3);
        endShape(CLOSE);

        line((-(this.r) + (this.r * 0.5)) / 1.5, 0, ((this.r) - (this.r * 0.5)) / 1.5, 0);
        fill(255);
        strokeWeight(3);
        point((-(this.r) + (this.r * 0.2)) / 1.5, this.r / 10);
        point(((this.r) - (this.r * 0.2)) / 1.5, this.r / 10);
        pop();

        this.move();
        this.shoot();
        this.shooting_time += 1;
    };
    this.move = function () {
        if (this.time_in_direction === 0) {
            this.time_in_direction = 50;
            this.direction = random(this.dirs);
        } else {
            this.time_in_direction -= 1;
        }
        this.position.x += this.x_way;
        if (this.direction === 'up' || this.position.y + 50 >= height)
            this.position.y -= 1;
        else if (this.direction === 'down' || this.position.y - 50 <= 0)
            this.position.y += 1;
    };
    this.shoot = function () {
        if (this.shooting_time >= 50 && ship.stroke_alpha !== 0) {
            var direction = ship.position.copy();
            direction = direction.sub(this.position);

            var direction_angle = (atan(direction.y / direction.x));
            if (direction.x < 0)
                direction_angle += PI;

            ship.lasers.push(new Laser(this.position, direction_angle, true));
            this.shooting_time = 0;
            shooting_sound.play();
        }
    };
    this.edges = function () {
        if (this.position.x > width)
            this.x_way *= -1;
        else if (this.position.x < -this.r)
            this.x_way *= -1;
    };
    this.explode = function () {
        explosion_sound.play();
        for (var i = 0; i < 30; i++) {
            explosion_particles.push(new Particle(this.position.copy()));
        }
        var power_ups_max = map(this.r, 0, 40, 0, 10);
        for (var j = 0; j < power_ups_max; j++) {
            power_ups.push(new PowerUp(random(PowerUp.all_power_ups), this.position.copy()));
        }
    };
}

Alien.started = false;