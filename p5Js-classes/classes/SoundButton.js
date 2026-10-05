class SoundButton {

    static Width = 200; // capitalise static  
    static Height = 100; // because lowercase is reserved  
    x;
    y;
    colour;

    constructor(index, x, y, colour) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.colour = colour;
    }


    buttonPressed() {
        //console.log("button pressed: " + this.index)
        const event = new CustomEvent('soundButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });

        _renderer.canvas.dispatchEvent(event);

        if (this.index === 1) { 
            drawFilter(); 
        }

    }


    buttonReleased() { }

    update() {
        if (mouseIsPressed && mouseX > this.x && mouseX < this.x + SoundButton.Width && mouseY > this.y && mouseY < this.y + SoundButton.Height) {
            this.buttonPressed()
            //console.log("mouse pressed: " + mouseIsPressed, "mouseX: " + mouseX, "mouseY: " + mouseY, "buttonX: " + this.x, "buttonY: " + this.y)
        } else {
            this.buttonReleased()
        }
    }

    draw() {
        fill(this.colour);
        noStroke();
        rect(this.x, this.y, SoundButton.Width, SoundButton.Height);
    }




}