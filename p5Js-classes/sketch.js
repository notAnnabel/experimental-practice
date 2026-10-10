// shape + button storage
let allShapes = [];
let buttons = [];

let prevMouseX, prevMouseY;

let buttonTriangleFlag = false;


function setup() {
  createCanvas(innerWidth, innerHeight);
  //rectMode(CENTER);
  //let offset = (width - SoundButton.Width  * SoundButton.Width /2);
  let offset = 500;
  for (let i = 0; i < 5; i++) {
    let button = new SoundButton(i, i * SoundButton.Width + offset, height - SoundButton.Height, color(random(255), random(255), random(255)));
    buttons.push(button)
  }


  // when canvas rendered, add event listener
  _renderer.canvas.addEventListener("soundButtonPressed", placeCircle);

  _renderer.canvas.addEventListener("soundButtonPressed", drawFilter);

  _renderer.canvas.addEventListener("triangleButtonPressed", placeTriangle);

  _renderer.canvas.addEventListener("squareButtonPressed", placeSquare);

  _renderer.canvas.addEventListener("pageRefresh", pageRefresh);

  //_renderer.canvas.addEventListener("", (eventMakeSquare) =>)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// functions used with events ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function placeCircle(event) {

  if (event.detail.index === 0) {
    let buttoncircle = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));

    allShapes.push(buttoncircle)
  }

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

function placeSquare(eventDrawSquare) {
  console.log("HELP ME")
  if (eventDrawSquare.detail.index === 2) {
    let buttonsquare = new Square(eventDrawSquare.detail.x, eventDrawSquare.detail.y, random(20, 100), eventDrawSquare.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2))
    allShapes.push(buttonsquare)
  }

}


function drawFilter(eventFilter) {
  if (eventFilter.detail.index === 1) {
    filter(INVERT);
  }

}

function pageRefresh(eventPageRefresh) {
  if (eventPageRefresh.detail.index === 4) {
    //pageRefresh()
    //refresh(); // p5js function that returns sketch to its original values
    window.location.reload();
    console.log("yay?")
  }
}



function draw() {
  background(220);
  noStroke();
  //beginTextRemove();

  if (mouseIsPressed) {

    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let mappedDx = map(dx, -width, width, -100, 100);
    let mappedDy = map(dy, -height, height, -100, 100);

    let myCircle = new Circle(
      mouseX, mouseY, // pos
      random(10, 100), // size
      color(random(20), random(100), random(255)),
      random(1000, 4000), // lifeSpan
      //random(-5, 5), random(-5, 5), // rand velocity
      mappedDx, mappedDy
    );


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
      mouseX, mouseY, mouseX - 20, mouseY + 20, mouseX + 20, mouseY + 20,
      color(random(20), random(100), random(255)), random(1000, 4000), mappedDx, mappedDy

    );

    allShapes.push(myCircle);
    allShapes.push(mySquare);
    allShapes.push(myTriangle)

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




}

