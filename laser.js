function Laser(ship_position, ship_heading) {
    this.position = createVector(ship_position.x, ship_position.y);
    this.velocity = p5.Vector.fromAngle(ship_heading).mult(10);
    this.delete = false;

    this.update = function () {
        this.position.add(this.velocity);
    };

    this.render = function () {
        this.edges();
        this.collision();
        push();
        stroke(255);
        strokeWeight(4);
        point(this.position.x, this.position.y);
        this.update();
        pop();
    };
    this.edges = function () {
        if (this.position.x > width) {
            this.delete = true;
        } else if (this.position.x < 0) {
            this.delete = true;
        }
        if (this.position.y > height) {
            this.delete = true;
        } else if (this.position.y < 0) {
            this.delete = true;
        }
    };
    this.collision = function () {
        var self = this;
        var new_asteroids = [];
        asteroids.forEach(function (asteroid) {
            var distance = dist(self.position.x, self.position.y, asteroid.position.x, asteroid.position.y);
            if (distance < asteroid.r) {
                new_asteroids = new_asteroids.concat(asteroid.break());
                asteroid.delete = true;
                self.delete = true;
                return true;
            }
        });
        asteroids = asteroids.concat(new_asteroids);
    }
}