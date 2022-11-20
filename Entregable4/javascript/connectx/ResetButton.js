import Figure from "./Figure.js"

export default class ResetButton extends Figure {
    constructor(posX, posY, size, imagePath){
        super(posX, posY, imagePath)
        this.width = size
        this.height = size
    }
    
    drawLogic(){
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    
    isMouseOver(x, y){
        return x > this.posX && x < this.posX + this.width && y > this.posY && y < this.posY + this.height
    }
}