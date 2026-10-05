class Circle extends Shape{


    size;
    fillColour;
    lifeSpan;
    birthTime;
    dead;
    timeAlive;
    
  draw(){
    fill(this.fillColour);
    ellipse(this.x, this.y, this.size);
  }

}