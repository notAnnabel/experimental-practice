class Square extends Shape{

  draw(){
    fill(this.fillColour);
    square(this.x, this.y, this.size);
    //mySquare.center()
  }

}