// shape + button global variables
let allShapes = [];
let buttons = [];
let labels = ["Circles", "Square", "Triangles", "Filter", "Reset"];
let currentShape; //currently selected button


let prevMouseX, prevMouseY;




function setup() {
  createCanvas(innerWidth, innerHeight);


  let offset = 500;
  for (let i = 0; i < 5; i++) {
    let button = new SoundButton(i, i * SoundButton.Width + offset, height - SoundButton.Height, color(random(255), random(255), random(255)), labels[i]);

    buttons.push(button)
  }


  // when canvas rendered, add event listener
  _renderer.canvas.addEventListener("ButtonPressed", placeShape);

  // _renderer.canvas.addEventListener("filterButtonPressed", drawFilter);

  // _renderer.canvas.addEventListener("triangleButtonPressed", placeTriangle);

  // _renderer.canvas.addEventListener("squareButtonPressed", placeSquare);

  // _renderer.canvas.addEventListener("pageRefresh", pageRefresh);


}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// functions used with events ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function placeShape(event) {
  let newShape;


  if (event.detail.label === "Circles") {
    newShape = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));
    
  }

  if (event.detail.label === "Square") {
    newShape = new Square(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));
  }

  if (event.detail.label === "Reset") {
    window.location.reload();
  }  
  allShapes.push(newShape);
}

function placeTriangle(eventDrawTriangle) {
  let x = eventDrawTriangle.detail.x; // added these in
  let y = eventDrawTriangle.detail.y;
  let colour = eventDrawTriangle.detail.colour;

  // if (eventDrawTriangle.detail.index === 3){
  //     let buttontriangle = new Triangle(eventDrawTriangle.detail.x1, eventDrawTriangle.detail.y2, 
  //                                   eventDrawTriangle.detail.x2, eventDrawTriangle.detail.y2,
  //                                   eventDrawTriangle.detail.x3, eventDrawTriangle.detail.y3, random(20,100),
  //                                   eventDrawTriangle.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2))
  // allShapes.push(buttontriangle)
  // }

  // if (eventDrawTriangle.detail.index === 3) {
  //   let buttontriangle = new Triangle(x, y - 30,
  //     x - 30, y + 30,
  //     x + 30, y + 30,
  //     colour,
  //     eventDrawTriangle.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2))
  //   allShapes.push(buttontriangle)
  // } meeeeeeeeeeeeeeeeeeee
}



function drawFilter(eventFilter) {
  if (eventFilter.detail.index === 3) {
    filter(INVERT);
  }

}






function draw() {
  let newShape;
  background(220);
  noStroke();
 

  // if the mouse is pressed create a new shape based on current mouse position
  if (mouseIsPressed) {

    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let mappedDx = map(dx, -width, width, -100, 100);
    let mappedDy = map(dy, -height, height, -100, 100);


   
    console.log(currentShape, "Draw Function");

    

    if (currentShape = "Circles") {
      newShape = new Circle(
        mouseX, mouseY, // pos
        random(10, 100), // size
        color(random(20), random(100), random(255)),
        random(1000, 4000), // lifeSpan
        mappedDx, mappedDy);
      console.log("In the circle")
    } else if (currentShape = "Square") {

      newShape = new Square(
        mouseX, mouseY, // pos
        random(10, 100), // size
        color(random(20), random(100), random(255)),
        random(1000, 4000), // lifeSpan
        random(-5, 5), random(-5, 5), // rand velocity
        mappedDx, mappedDy);
      console.log("in the square");
    } else if (currentShape = "Triangles") {
      console.log("In the triangle");
      }

    // add new shape to the queue
    allShapes.push(newShape);


  }

  // update each shape in the queue. kill off any timed out shapes
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1); // current value, remove 1 value
      i--; // change the index value so no shapes are missed
    }
  }

  // update the command buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
  }


  // track previous frame: mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;


  // draw all the shapes in the array
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw();
  }

  // loop through and draw buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }




}

