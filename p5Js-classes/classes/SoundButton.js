class SoundButton {

    static buttonWidth = 200;
    static buttonHeight = 100;
   
    

    constructor(x, y, colour, label) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.label = label;
        // this.delayFilterDraw = 0;
    }


    //buttonPressed() {
    //        let eventDraw = new CustomEvent('ButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index, label: this.label } });
    //        // const eventFilter = new CustomEvent('filterButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
            // const eventDrawSquare = new CustomEvent('squareButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
            // const eventDrawTriangle = new CustomEvent('triangleButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
            // const eventPageRefresh = new CustomEvent('pageRefresh', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });

    //        _renderer.canvas.dispatchEvent(eventDraw);
    //        currentShape = eventDraw.detail.label;
    //        console.log("button Pressed", currentShape);
    //}

    buttonSelected() {

        if (mouseX > this.x && mouseX < this.x + SoundButton.buttonWidth && mouseY > this.y && mouseY < this.y + SoundButton.buttonHeight) {
            // mouse click is within borders of the button
            return true;
        } else {
            return false;
        }
    }    
    
    buttonReleased() { }
        
    update() { 
        
    }     
    

    draw() {
            
            fill(this.colour);
            //noStroke();
            rect(this.x, this.y, SoundButton.buttonWidth, SoundButton.buttonHeight);
            

            // write labels on the buttons
            textSize(50)
            fill("Black")
            textAlign(CENTER, CENTER)
            text(this.label, this.x + SoundButton.buttonWidth / 2, this.y + SoundButton.buttonHeight / 2)
    }

    



}
