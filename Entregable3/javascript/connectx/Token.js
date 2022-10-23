import Figure from "./Figure.js"

export default class Token extends Figure {
  constructor(posX, posY, radius, imagePath) {
    super(posX, posY, imagePath)
    this.radius = radius
  }

  drawLogic() {
    this.context.drawImage(
      this.image,
      this.posX - this.radius,
      this.posY - this.radius,
      this.radius * 2,
      this.radius * 2
    )
  }

  isMouseOver(x, y) {
    return (
      Math.sqrt(Math.pow(this.posX - x, 2) + Math.pow(this.posY - y, 2)) <
      this.radius
    )
  }
}
