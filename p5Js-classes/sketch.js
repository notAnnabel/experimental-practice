// shapes storage
let allShapes = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(60);
}

function draw() {
  background(220);
  noStroke();

  if (mouseIsPressed) {
    let myCircle = new Circle(
      mouseX, mouseY, // pos
      random(10, 100), // size
      color(random(20), random(100), random(255)), 
      random(1000, 4000), // lifeSpan
      random(-5, 5), random(-5, 5) // rand velocity
    );

    allShapes.push(myCircle);
  }

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1); // current value, remove 1 value
      i--; // change the index value so no shapes are missed
    }
  }

  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw();
  }
}

