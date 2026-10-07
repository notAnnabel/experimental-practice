class Triangle extends Shape{
  constructor(x, y, size, fillColour, lifeSpan, vx, vy, triangleVertices) { //fix
    super(x, y, size, fillColour, lifeSpan, vx, vy);
    
  }
  draw(){
    fill(this.fillColour);
    triangle(this.x, this.y, this.size);
    //mySquare.center()
  }

}