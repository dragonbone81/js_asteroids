function Asteroid(position, radius, no_effect) {
    this.min_size = 5;
    this.no_effect = no_effect;
    if (no_effect) {
        this.no_effect = no_effect;
    } else {
        this.no_effect = 0;
    }
    if (position) {
        this.position = position.copy();
    } else {
        this.position = createVector(random(width), random(height));
    }
    this.velocity = p5.Vector.random2D();
    if (radius) {
        this.r = random(this.min_size, radius);
    } else {
        this.r = random(this.min_size, 40);
    }
    this.total_vert = random(this.min_size, 16);
    this.delete = false;
    this.vertices = [];
    for (var i = 0; i < this.total_vert; i++) {
        var angle = map(i, 0, this.total_vert, 0, TWO_PI);
        var offset = random(-this.r / 2, this.r / 2);
        var x = (this.r + offset) * cos(angle);
        var y = (this.r + offset) * sin(angle);
        this.vertices.push(new p5.Vector(x, y));
    }
    this.move = function () {
        this.position.add(this.velocity);
    };
    this.render = function () {
        push();
        noFill();
        stroke(255);
        translate(this.position.x, this.position.y);
        beginShape();
        for (var i = 0; i < this.total_vert; i++) {
            vertex(this.vertices[i].x, this.vertices[i].y);
        }
        endShape(CLOSE);
        this.move();
        this.edges();
        pop();
        if (this.no_effect > 0)
            this.no_effect -= 1;
    };
    this.explode = function () {
        explosion_sound.play();
        for (var i = 0; i < 25; i++) {
            explosion_particles.push(new Particle(this.position.copy()));
        }
    };
    this.break = function () {
        var newAsteroids = [];
        if (this.r <= this.min_size * 3) {
            this.delete = true;
        }
        else {
            newAsteroids.push(new Asteroid(this.position, max(this.r / 1.1, this.min_size)));
            newAsteroids.push(new Asteroid(this.position, max(this.r / 1.1, this.min_size)));
        }
        this.explode();
        return newAsteroids;
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
}