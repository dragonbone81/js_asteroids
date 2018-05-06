function Particle(position, variability) {
    this.variability = 2;
    if (variability)
        this.variability = variability;
    this.position = position;
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.5, this.variability));
    this.time = 0;
    this.delete = false;
    this.alpha = 255;
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
        if (this.time === 100) {
            this.delete = true;
        }
        this.position.add(this.velocity);
    };
}