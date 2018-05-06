function PowerUp(type, position) {
    this.type = type;
    if (this.type === 'shield')
        this.color = [0, 0, 255, 255];
    else if (this.type === 'score')
        this.color = [255, 0, 0, 255];
    else {
        this.color = [0, 255, 0, 255];
    }
    this.variability = 0.3;
    this.position = position;
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.1, this.variability));
    this.time = 0;
    this.delete = false;
    this.max_time = 500;
    this.render = function () {
        push();
        stroke(this.color);
        if (this.type === 'shield')
            strokeWeight(4);
        else if (this.type === 'score')
            strokeWeight(8);
        point(this.position.x, this.position.y);
        this.update();
        pop();
    };
    this.update = function () {
        this.collision_calc();
        this.time += 1;
        if (this.max_time - this.time < 100)
            this.color[3] -= 5;
        if (this.time === this.max_time) {
            this.delete = true;
        }
        this.position.add(this.velocity);
    };

    this.collision_calc = function () {
        var distance = dist(this.position.x, this.position.y, ship.position.x, ship.position.y);
        if (distance < ship.r) {
            if (this.type === 'shield') {
                if (ship.sheild < 100) {
                    ship.sheild += 2;
                }
            } else if (this.type === 'score') {
                add_score(5);
            }
            this.delete = true;
        } else if (distance < ship.r * 5) {
            var force = this.position.copy();
            norm(force.sub(ship.position));
            this.velocity.add(force.mult(-0.002));
        }
    }
}