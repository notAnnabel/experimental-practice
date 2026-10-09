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
        this.delayFilterDraw = 0;// changed millis to 0

        //this.buttonClickOne = false; // turns true when used, flag
    }


    buttonPressed() {
        //console.log("button pressed: " + this.index)
        const event = new CustomEvent('soundButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventFilter = new CustomEvent('FilterSwapPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventDrawSquare = new CustomEvent('squareButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });
        const eventDrawTriangle = new CustomEvent('triangleButtonPressed', { detail: { x: this.x, y: height / 2, colour: color(random(255), random(255), random(255)), index: this.index } });


        _renderer.canvas.dispatchEvent(event);
        _renderer.canvas.dispatchEvent(eventDrawTriangle)
        _renderer.canvas.dispatchEvent(eventDrawSquare);

        if (this.index === 1) {
            //this.buttonClickOne = true;
            if (this.buttonClickOne === true) {
                setTimeout(drawFilter, 1000);
                //drawFilter();
                //this.delayFilterDraw = 0;
                this.buttonClickOne = false;
            }

            // if (this.index === 2){
        }
        if (this.index === 2){

        }
        //}
        ///// attempted to use millis, not necessary. learnt setTimeout. Then realized
        // this.index === 1 causes repeat draws each frame
        // to fix
        // used delayfilterdraw + millis
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




