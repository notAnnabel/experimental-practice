class SoundButton {

    static Width = 200; // capitalise static  
    static Height = 100; // because lowercase is reserved  
    constructor(index, x, y, colour){
      this.index = index;
      this.x = x;
      this.y = y;
      this.colour = colour;
    }


    buttonPressed(){
        console.log("button pressed: " + this.index)
    }

    buttonReleased(){}

    update(){
        if(mousePressed && mouseX>this.x && mouseX<this.x+SoundButton.Width && mouseY>this.y && mouseY<this.y+SoundButton.Height){
            this.buttonPressed()
        } else {
            this.buttonReleased()
        }
    }

    draw(){
        fill(this.colour);
        noStroke();
        rect(this.x, this.y, SoundButton.Width, SoundButton.Height);
    }


  

}