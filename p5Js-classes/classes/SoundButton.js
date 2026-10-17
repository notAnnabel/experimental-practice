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
            // text is the label from the constructor
    }

    



}
