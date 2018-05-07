function Ship() {
    this.position = createVector(width / 2, height / 2);
    this.lasers = [];
    this.r = 10;
    this.heading = 0;
    this.rotation_angle = 0.05;
    this.thrust_amaount = 0.1;
    this.rotating_left = false;
    this.rotating_right = false;
    this.velocity = createVector(0, 0);
    this.thrusting = false;
    this.shooting = false;
    this.shooting_time = 10;
    this.crash = false;
    this.exploding = false;
    this.stroke_alpha = 255;
    this.health = 100;
    this.sheild = 100;
    this.power = 1;
    this.move = function () {
        if (ship.thrusting) ship.thrust();
        if (ship.shooting) ship.shoot();
        if (ship.rotating_right) ship.turn(1);
        if (ship.rotating_left) ship.turn(-1);
        this.position.add(this.velocity);
        this.velocity.mult(0.99);
        this.edges();
    };
    this.thrust = function () {
        thrusting_sound.play();
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(this.thrust_amaount);
        this.velocity.add(force);

        for (var i = 0; i < 1; i++) {
            var x = this.position.copy();
            x = x.sub(p5.Vector.fromAngle(this.heading).mult(15));
            explosion_particles.push(new Particle(x, 2, 100, 50));
        }

    };
    this.shoot = function () {
        if (this.shooting_time >= 15) {
            this.lasers.push(new Laser(this.position, this.heading));
            this.shooting_time = 0;
            shooting_sound.play();
        }
    };
    this.edges = function () {
        if (this.position.x > width + this.r) {
            this.position.x = -this.r;
        } else if (this.position.x < -this.r) {
            this.position.x = width + this.r;
        }
        if (this.position.y > height + this.r) {
            this.position.y = -this.r;
        } else if (this.position.y < -this.r) {
            this.position.y = height + this.r;
        }
    };
    this.draw_ship = function () {
        push();
        translate(this.position);
        rotate(this.heading + PI / 2);
        fill(1, this.stroke_alpha);
        stroke(255, this.stroke_alpha);
        beginShape();
        vertex(-this.r, this.r);
        vertex(0, this.r - this.r * 0.5);
        vertex(this.r, this.r);
        vertex(0, -this.r * 2);
        endShape(CLOSE);
        pop();
    };
    this.hide = function () {
        this.stroke_alpha = 0;
    };
    this.render = function () {
        this.render_lasers();
        push();
        this.draw_ship();
        this.move();
        pop();
        this.shooting_time += 1;
        if (!this.crash)
            this.check_crash();
    };
    this.render_lasers = function () {
        this.lasers = this.lasers.filter(function (laser) {
            return !(laser.delete);
        });
        this.lasers.forEach(function (laser) {
            laser.render();
        })
    };
    this.turn = function (direction) {
        this.heading += this.rotation_angle * direction;
    };
    this.explode = function () {
        explosion_sound.play();
        for (var i = 0; i < 150; i++) {
            explosion_particles.push(new Particle(this.position.copy(), 6));
        }
    };
    this.check_crash = function () {
        var self = this;
        asteroids.forEach(function (asteroid) {
            if (asteroid.no_effect === 0) {
                var distance = dist(self.position.x, self.position.y, asteroid.position.x, asteroid.position.y);
                if (distance < self.r + asteroid.r) {
                    self.hit(1);
                    return true;
                }
            }
        })

    };
    this.hit = function (hit_amount) {
        if (!new_game) {
            if (this.sheild <= 0) {
                if (this.health === 0) {
                    this.crash = true;
                } else {
                    this.health -= hit_amount;
                }
            } else {
                this.sheild -= hit_amount;
            }
            if (this.sheild < 0) {
                this.sheild = 0;
            }
            if (this.health < 0) {
                this.health = 0;
            }
        }
    }
}