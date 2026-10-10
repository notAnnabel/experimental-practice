// shape + button storage
let allShapes = [];
let buttons = [];

let prevMouseX, prevMouseY;

let buttonCircleFlag = false;
let buttonSquareFlag = false;
let buttonTriangleFlag = false;
let textBeginFlag = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  //rectMode(CENTER);
  //let offset = (width - SoundButton.Width  * SoundButton.Width /2);
  let offset = 500;
  for (let i = 0; i < 5; i++) {
    let button = new SoundButton(i, i * SoundButton.Width + offset, height - SoundButton.Height, color(random(255), random(255), random(255)));
    buttons.push(button)
  }
  //_renderer.canvas.addEventListener("soundButtonPressed", (event) => {
  //console.log("event with index:" +event.detail.index)

  // when canvas rendered, add event listener
  _renderer.canvas.addEventListener("soundButtonPressed", placeCircle)
  
  _renderer.canvas.addEventListener("soundButtonPressed", drawFilter)

  _renderer.canvas.addEventListener("soundButtonPressed", placeTriangle)

  _renderer.canvas.addEventListener("squareButtonPressed", placeSquare)

  //_renderer.canvas.addEventListener("", (eventMakeSquare) =>)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// functions used with events ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const beginText = () => (
  text("Click on any button to begin", width/2, height/2)
);


function placeCircle(event) {
  console.log("event with index:" + event.detail.index)
  if(event.detail.index===0){
    let buttoncircle = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));
    
    allShapes.push(buttoncircle)
  }
  
}

function placeTriangle(eventDrawTriangle){
  console.log("event with index yay" + eventDrawTriangle.detail.index)
  let buttontriangle = new Triangle(eventDrawTriangle.detail.x1, eventDrawTriangle.detail.y2, 
                                    eventDrawTriangle.detail.x2, eventDrawTriangle.detail.y2,
                                    eventDrawTriangle.detail.x3, eventDrawTriangle.detail.y3, random(20,100),
                                    eventDrawTriangle.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2))
  allShapes.push(buttontriangle)
}

function placeSquare(eventDrawSquare){
  console.log("HELP ME")
  if (eventDrawSquare.detail.index === 2){
    let buttonsquare = new Square(eventDrawSquare.detail.x, eventDrawSquare.detail.y, random(20, 100), eventDrawSquare.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2))
    allShapes.push(buttonsquare)
  }
  
}


function drawFilter(eventFilter){
  if (eventFilter.detail.index === 1){
    filter(INVERT);
  }
  
}

//drawFilter = () => (filter(INVERT)); 


function draw() {
  background(220);
  noStroke();

  if (mouseIsPressed) {

    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let mappedDx = map(dx, -width, width, -100, 100);
    let mappedDy = map(dy, -height, height, -100, 100);
    
    // let myCircle = new Circle(
    //   mouseX, mouseY, // pos
    //   random(10, 100), // size
    //   color(random(20), random(100), random(255)),
    //   random(1000, 4000), // lifeSpan
    //   //random(-5, 5), random(-5, 5), // rand velocity
    //   mappedDx, mappedDy
    // );


    let mySquare = new Square(
      mouseX, mouseY, // pos
      random(10, 100), // size
      color(random(20), random(100), random(255)),
      random(1000, 4000), // lifeSpan
      //random(-5, 5), random(-5, 5), // rand velocity
      mappedDx, mappedDy
    );

    let myTriangle = new Triangle(
      //mouseX, mouseY, random(10, 100), random(10, 100), random(10, 100), random(10, 100),
      mouseX, mouseY, mouseX-20, mouseY+20, mouseX+20, mouseY+20,
      color(random(20), random(100), random(255)), random(1000, 4000), mappedDx, mappedDy

     );



    //let leftButton = new SoundButton(0, 100, 100, color(255, 0, 0));

    //allShapes.push(myCircle);
    //allShapes.push(mySquare);
    //allShapes.push(myTriangle)
    
  }

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1); // current value, remove 1 value
      i--; // change the index value so no shapes are missed
    }
  }

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].update();
    }


  // track previous frame: mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw();
  }

  // loop through and draw buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
  

  drawFilter()



  //delayFilterDraw = 0;
  //delayFi
  //delayFilterDiff = millis() - delayFilterDraw
  //drawFilter();

  // originally going to do millis calc but settimeout is better for this case
  // it is in button 


}

