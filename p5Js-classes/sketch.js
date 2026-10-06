// shape + button storage
let allShapes = [];
let buttons = [];

let prevMouseX, prevMouseY;

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
  _renderer.canvas.addEventListener("soundButtonPressed", placeShape)
  //})
}

function placeShape(event) {
  console.log("event with index:" + event.detail.index)
  let buttoncircle = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 5000), random(-2, 2), random(-2, 2));
  allShapes.push(buttoncircle)
}


function drawFilter(){
  //rect(0, 0, innerWidth, innerHeight);
  filter(INVERT);
}


function draw() {
  background(220);
  noStroke();

  if (mouseIsPressed) {

    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let mappedDx = map(dx, -width, width, -100, 100);
    let mappedDy = map(dy, -height, height, -100, 100);

    let myShape = new Circle(
      mouseX, mouseY, // pos
      random(10, 100), // size
      color(random(20), random(100), random(255)),
      random(1000, 4000), // lifeSpan
      //random(-5, 5), random(-5, 5), // rand velocity
      mappedDx, mappedDy
    );

    //let leftButton = new SoundButton(0, 100, 100, color(255, 0, 0));

    allShapes.push(myShape);
    
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
  //drawFilter();
}

