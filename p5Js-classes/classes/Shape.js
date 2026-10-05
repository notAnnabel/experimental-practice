class Shape {
    // class properties
    x;
    y;

    vx; // velocity
    yx;

    size;
    fillColour;
    lifeSpan;
    birthTime;
    dead;
    timeAlive;

    originalStates;

  constructor(x, y, size, fillColour, lifeSpan, vx, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fillColour = fillColour;
    this.lifeSpan = lifeSpan;
    this.birthTime = millis();
    this.vx = vx;
    this.vy = vy;
    
    this.originalStates = {size: this.size};
  }

  update() {
    this.timeAlive = millis() - this.birthTime;
    let ratio = this.timeAlive / this.lifeSpan; // num, 0-1 birth and death
    // death test!
    if (ratio >=1){
        this.dead = true;
    }


    this.size = this.originalStates.size * (1-ratio); // remap ratio to 1
    
    //this.alpha = this.originalStates.alpha * (1-ratio);

    // update position
    this.x += this.vx;
    this.y += this.vy
    // test for boundary collision
    if (this.x < 0 + this.size/2 || this.x > width - this.size/2) {
        this.vx *= -1; // reverse direction
    }

    if (this.y < 0 + this.size/2 || this.y > height - this.size/2){
        this.vy *= -1; // reverse direction
    }

    // colour based on time alive
    let r = red(this.fillColour) * (1-ratio);
    let g = green(this.fillColour) * (1-ratio);
    let b = blue(this.fillColour) * (1-ratio);
    this.fillColour = color(r, g, b, 255 * (1-ratio));
  }
}