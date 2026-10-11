class SoundButton {

    static Width = 200; // capitalise static  
    static Height = 100; // because lowercase is reserved  
    x;
    y;
    colour;

    constructor(index, x, y, colour, label) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.label = label;
        this.delayFilterDraw = 0;// changed millis to 0

        //this.buttonClickOne = false; // turns true when used, flag
    }


    buttonPressed() {
        //console.log("button pressed: " + this.index)
        const eventDrawCircle = new CustomEvent('soundButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventFilter = new CustomEvent('FilterSwapPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventDrawSquare = new CustomEvent('squareButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventDrawTriangle = new CustomEvent('triangleButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventPageRefresh = new CustomEvent('pageRefresh', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });

        
        setTimeout(drawFilter, 1000);

        if (this.label === "Circles") {
            // Circles
            
                _renderer.canvas.dispatchEvent(eventDrawCircle)
                
        }

        
        if (this.label === "Triangles"){
            _renderer.canvas.dispatchEvent(eventDrawTriangle);
            
        }

        if (this.label === "Square"){

            _renderer.canvas.dispatchEvent(eventDrawSquare)

        }
        if (this.index === "Reset"){
            // reset the canvas
           _renderer.canvas.dispatchEvent(eventPageRefresh);


        }

        if (this.index === "Filter"){
            // invert the colours
           _renderer.canvas.dispatchEvent(eventFilter);



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
        //noStroke();
        rect(this.x, this.y, SoundButton.Width, SoundButton.Height);
        textSize(50)
        fill("Black")
        textAlign(CENTER,CENTER)
        text(this.label, this.x + SoundButton.Width/2, this.y +  SoundButton.Height /2)

        
    }

}




