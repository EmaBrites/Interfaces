
import Figure from "./Figure.js"

export default class Cell extends Figure {
  constructor(posX, posY, size, imagePath) {
    super(posX, posY, imagePath)
    this.size = size
  }

  drawLogic() {
    this.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.size,
      this.size
    )
  }
  
  isMouseOver(x, y) {
    return false
  }

  drawTokenInside(token){
    token.setPosition(this.posX + this.size/2,this.posY + this.size/2)
    token.draw()
  }
} 