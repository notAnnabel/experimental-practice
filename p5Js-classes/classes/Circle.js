class Circle extends Shape{
  draw(){
    fill(this.fillColour);
    ellipse(this.x, this.y, this.size);
  }

}