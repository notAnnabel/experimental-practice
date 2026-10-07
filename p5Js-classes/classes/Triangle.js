class Triangle extends Shape{

  draw(){
    fill(this.fillColour);
    triangle(this.x, this.y, this.size);
    //mySquare.center()
  }

}