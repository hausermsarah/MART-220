class Character {
    constructor(x, y, radius, images) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.images = images; 
        this.currentFrame = 0; 
    }

    draw() {
        
        image(this.images[this.currentFrame], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        
   
        this.currentFrame = (this.currentFrame + 1) % this.images.length;
    }
}