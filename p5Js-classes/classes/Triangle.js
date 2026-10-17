class Triangle extends Shape{
  
   
  
  draw(){
    fill(this.fillColour);

    // calculate other points on triangle
    // 
    let triangleHeight = Math.sqrt(Math.pow(this.size,2)-Math.pow(this.size/2,2));
    // pythagorus square of hypotenuse is sum of squares of other sides
    
    // left vertex, right vertex, high point vertex
    triangle(this.x, this.y, 
             this.x + this.size, this.y, 
             this.x + this.size/2, this.y - triangleHeight);
    
  }

}