class Particle {
    constructor(x, y, radius, pColor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.pColor = pColor;
    }

    draw() {
        fill(this.pColor);
        circle(this.x, this.y, this.radius * 2);
    }
}
