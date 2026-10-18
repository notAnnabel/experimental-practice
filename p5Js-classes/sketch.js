// shape + button global variables
let allShapes = [];
let buttons = [];
let labels = ["Circles", "Square", "Triangles", "Filter", "Reset"];
let currentShape = "Circles"; //currently selected button
let prevMouseX, prevMouseY;




function setup() {
  createCanvas(innerWidth, innerHeight);
  
  // center buttons relative to the screen width
  let offset = (innerWidth-(labels.length*SoundButton.buttonWidth)) /2;
  //create a button for each label
  for (let i = 0; i < labels.length; i++) {
    
    let button = new SoundButton(
      (i+1) * SoundButton.buttonWidth + offset,
      height - SoundButton.buttonHeight,
      color(random(255), random(255), random(255)),
      labels[i]);

    buttons.push(button)
  }
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// functions used with events ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseClicked(event) {

  //check to see if the mouse has clicked any of the buttons
  for (let i = 0; i < labels.length; i++) {
    
    if (buttons[i].buttonSelected())     {
      // the mouse has clicked in one of the buttons
      if (buttons[i].label === "Filter") {
        // run through shape queue and change colours
        /////////////////for (let j = 0; j < allShapes.length; j++){
           //getcol = color(allShapes[j]);
          //  getRed = red(allShapes[j].fillColour);
          //  getGreen = green(allShapes[j].fillColour);
          //  getBlue = blue(allShapes[j].fillColour)
          //  changeColour(getRed, getGreen, getBlue)
           //changeColour(getcol);
            console.log("Filter clicked");
            console.log("Number of shapes:", allShapes.length);


           /// chat
           for (let j =0; j < allShapes.length; j++){
            
             console.log("Before:", allShapes[j].fillColour);

            let r = red(allShapes[j].fillColour);
            let g = green(allShapes[j].fillColour);
            let b = blue(allShapes[j].fillColour);
            
            allShapes[j].changeColour(r,g,b);
           
            // allShapes[j] = shape; 
            console.log("after", allShapes[j].fillColour)
          //}

           //fill(Shape.changeColour(allShapes[i].fillColour))
           console.log("working")
        }
         
        
        
        //filter(INVERT);
        console.log("filter applied");
      } else if (buttons[i].label === "Reset" ){
        window.location.reload();
      } else {
        //only change shape type with the circle, square and traingle buttons
        currentShape = buttons[i].label;
      }
      
    }
  }
}

//function placeShape(event) {
//  let newShape;

//  if (currentShape === "Circles") {
//    newShape = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));

//  } else if (currentShape === "Square") {
//    newShape = new Square(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));
//  } else if (currentShape === "Triangles") {
//    let triangleBase = random(20,100);
//    let triangleHeight = Math.sqrt(Math.square(triangleBase)-Math.square(triangleBase/2));// pythagorus square of hypotenuse is sum of squares of other sides
//    newShape = new Triangle(event.detail.x,event.detail.y,
//                           event.detail.x + triangleBase, event.detail.y,
//                            event.detail.x + triangleBase /2, event.detail.y - triangleHeight)
 // }
 



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
    
    if (currentShape === "Circles") { // mouse clicked, changes current shape based on array label
      newShape = new Circle(
        mouseX, mouseY, // pos
        random(10, 100), // size
        color(random(20), random(100), random(255)),
        random(1000, 8000), // lifeSpan
        mappedDx, mappedDy); //velocity
    } else if (currentShape === "Square") {
      newShape = new Square(
        mouseX, mouseY, // pos
        random(10, 100), // size
        color(random(20), random(100), random(255)),
        random(1000, 8000), // lifeSpan
        mappedDx, mappedDy);
      } else if (currentShape === "Triangles") {
        let triangleBase = random(20,100);
        newShape = new Triangle(mouseX,mouseY, // x, y
                                triangleBase, // size is effected by base size
                                color(random(20), random(100), random(255)), // random RGB colour
                                random(1000, 4000), // lifeSpan
                                mappedDx, mappedDy);
        

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

