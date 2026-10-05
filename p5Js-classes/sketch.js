// shapes storage
let allShapes = [];
let buttons = [];

let prevMouseX, prevMouseY;

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
  rectMode(CENTER);
  for (let i = 0; i <5; i++){
    let button = new SoundButton(i, i * SoundButton.Width, height - SoundButton.Height, color(random(255), random(255), random(255)));
    buttons.push(button)
    
  }
}

function draw() {
  background(220);
  noStroke();

  if (mouseIsPressed) {

    let dx = mouseX - prevMouseX;
    let dy = mouseY - prevMouseY;
    let mappedDx = map(dx, -width, width, -100,100);
    let mappedDy = map(dy, -height, height, -100,100);

    let myShape = new Circle(
      mouseX, mouseY, // pos
      random(10, 100), // size
      color(random(20), random(100), random(255)), 
      random(1000, 4000), // lifeSpan
      //random(-5, 5), random(-5, 5), // rand velocity
      mappedDx, mappedDy
    );

    let leftButton = new SoundButton(0, 100, 100, color(255, 0, 0));

    allShapes.push(myShape);
  }

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1); // current value, remove 1 value
      i--; // change the index value so no shapes are missed
    }
  }
  

  // track previous frame: mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw();
  }

  // loop through and draw buttons
  for (let i = 0; i < buttons.length; i++){
    buttons[i].draw();
  }
}

