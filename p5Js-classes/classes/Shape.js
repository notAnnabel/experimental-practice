class Circle {
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

  constructor(x, y, size, fillColour, lifeSpan, vx, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fillColour = fillColour;
    this.lifeSpan = lifeSpan;
    this.birthTime = millis();
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.timeAlive = millis() - this.birthTime;
    let ratio = this.timeAlive / this.lifeSpan; // num, 0-1 birth and death
    // death test!
    if (ratio >=1){
        this.dead = true;
    }

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
  }
}