export default class Gametext {
    constructor(posX, posY, text) {
        this.posX = posX
        this.posY = posY
        this.text = text
    }

    setText(text) {
        this.text = text
    }
    
    draw(context) {
        context.fillStyle = "white";
        context.font = "30px Silkscreen";
        context.fillText(this.text, this.posX, this.posY)
    }
    }