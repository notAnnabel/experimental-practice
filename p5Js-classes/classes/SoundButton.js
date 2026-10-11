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
    
        
    }


    buttonPressed() {
        let eventDraw = new CustomEvent('ButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index , label: this.label} });
        // const eventFilter = new CustomEvent('filterButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        // const eventDrawSquare = new CustomEvent('squareButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        // const eventDrawTriangle = new CustomEvent('triangleButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        // const eventPageRefresh = new CustomEvent('pageRefresh', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });

         

                  
        _renderer.canvas.dispatchEvent(eventDraw);
         currentShape = eventDraw.detail.label;
         console.log ("button Pressed", currentShape);
                
    }

        
    
    buttonReleased() { }

    update() {
        if (mouseIsPressed  && mouseX > this.x && mouseX < this.x + SoundButton.Width && mouseY > this.y && mouseY < this.y + SoundButton.Height) {
            this.buttonPressed()
           
        } else {
            this.buttonReleased()
        }
    }

    draw() {
        fill(this.colour);
        //noStroke();
        rect(this.x, this.y, SoundButton.Width, SoundButton.Height);

        // write labels on the buttons
        textSize(50)
        fill("Black")
        textAlign(CENTER,CENTER)
        text(this.label, this.x + SoundButton.Width/2, this.y +  SoundButton.Height /2)

        
    }

}




