function Ship() {
    this.position = createVector(width / 2, height / 2);
    this.lasers = [];
    this.r = 20;
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
    this.move = function () {
        if (ship.rotating_right) ship.turn(1);
        if (ship.rotating_left) ship.turn(-1);
        if (ship.thrusting) ship.thrust();
        if (ship.shooting) ship.shoot();
        this.position.add(this.velocity);
        this.velocity.mult(0.99);
        this.edges();
    };
    this.thrust = function () {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(this.thrust_amaount);
        this.velocity.add(force);
    };
    this.shoot = function () {
        if (this.shooting_time >= 15) {
            this.lasers.push(new Laser(this.position, this.heading));
            this.shooting_time = 0;
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
        translate(this.position);
        rotate(this.heading + PI / 2);
        fill(0);
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r * 2);
    };
    this.render = function () {
        push();
        this.draw_ship();
        this.move();
        pop();
        this.render_lasers();
        this.shooting_time += 1;
        this.crashed();
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
    this.crashed = function () {
        var self = this;
        asteroids.forEach(function (asteroid) {
            var distance = dist(self.position.x, self.position.y, asteroid.position.x, asteroid.position.y);
            if (distance < self.r + asteroid.r) {
                self.crash = true;
                console.log('you lost');
                return true;
            }
        })
    }
}