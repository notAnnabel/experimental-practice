class Triangle extends Shape{
  constructor(x1, y1, x2, y2, x3, y3, fillColour, lifeSpan, vx, vy) { //fix
    super(fillColour, lifeSpan, vx, vy);

    //this.x = x;
    //this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.y2 = y2;
    this.x2 = x2;
    this.x3 = x3;
    this.y3 = y3;
    
  }
  draw(){
    fill(this.fillColour);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    //mySquare.center()
  }

}