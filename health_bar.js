function HealthBar() {
    this.width = 200;
    this.height = 25;
    this.render = function () {
        var mapped_width_health = map(ship.health, 0, 100, 0, this.width);
        var mapped_width_shield = map(ship.sheild, 0, 100, 0, this.width + 10);
        push();
        noStroke();
        fill(0, 255, 0, 150);
        rect(width / 2 - this.width / 2, height - this.height * 1.5, mapped_width_health, this.height);
        fill(255, 0, 0, 150);
        rect(width / 2 - this.width / 2 + mapped_width_health, height - this.height * 1.5, this.width - mapped_width_health, this.height);

        fill(0,191,255, 50);
        rect(width / 2 - this.width / 2 - 5, height - this.height * 1.5 - 5, mapped_width_shield, this.height + 10);

        pop();

    }
}