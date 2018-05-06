function Particle(position, variability, alpha, max_time) {
    this.variability = 2;
    if (variability)
        this.variability = variability;
    this.position = position;
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, this.variability));
    this.time = 0;
    this.delete = false;
    this.alpha = 255;
    this.max_time = 100;
    if (max_time)
        this.max_time = max_time;
    if (alpha) {
        this.alpha = alpha
    }
    this.render = function () {
        push();
        stroke(255, this.alpha);
        strokeWeight(4);
        point(this.position.x, this.position.y);
        this.update();
        pop();
    };
    this.update = function () {
        this.time += 1;
        this.alpha -= 3;
        if (this.time === this.max_time) {
            this.delete = true;
        }
        this.position.add(this.velocity);
    };
}