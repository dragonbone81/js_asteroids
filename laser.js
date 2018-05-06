function Laser(ship_position, ship_heading) {
    this.velocity = p5.Vector.fromAngle(ship_heading).mult(6);// + (ship_velocity);
    this.position = createVector(ship_position.x, ship_position.y).add(this.velocity.copy().mult(5));
    this.delete = false;

    this.update = function () {
        this.position.add(this.velocity);
    };

    this.render = function () {
        this.edges();
        this.asteroid_collision();
        push();
        stroke(255);
        strokeWeight(4);
        point(this.position.x, this.position.y);
        this.update();
        pop();
    };
    this.edges = function () {
        if (this.position.x > width * 1.3) {
            this.delete = true;
        } else if (this.position.x < 0 - width * 1.3) {
            this.delete = true;
        }
        if (this.position.y > height * 1.3) {
            this.delete = true;
        } else if (this.position.y < 0 - height * 1.3) {
            this.delete = true;
        }
    };
    this.asteroid_collision = function () {

        var self = this;
        var new_asteroids = [];
        asteroids.forEach(function (asteroid) {
            var collision = self.collision_calc(asteroid.vertices, self.position.x, self.position.y, asteroid.position);
            if (collision) {
                new_asteroids = new_asteroids.concat(asteroid.break());
                asteroid.delete = true;
                if (!self.delete)
                    add_score(1);
                self.delete = true;
                if (score % 5 === 0 || asteroids.length < 5) {
                    add_asteroids(floor(random(1, 3)));
                }
                return true
            }
        });
        asteroids = asteroids.concat(new_asteroids);
    };
    this.collision_calc = function (vertices, px, py, position) {
        //https://www.jeffreythompson.org/collision-detection/poly-point
        var collision = false;
        var next = 0;
        for (var current = 0; current < vertices.length; current++) {
            next = current + 1;
            if (next === vertices.length) next = 0;
            var vc = vertices[current];    // c for "current"
            var vn = vertices[next];       // n for "next"
            if ((((vc.y + position.y) > py && (vn.y + position.y) < py) || ((vc.y + position.y) <
                    py && (vn.y + position.y) > py)) &&
                (px < ((vn.x + position.x) - (vc.x + position.x)) * (py - (vc.y + position.y)) /
                    ((vn.y + position.y) - (vc.y + position.y)) + (vc.x + position.x))) {
                collision = !collision;
            }
        }
        return collision;
    }
}