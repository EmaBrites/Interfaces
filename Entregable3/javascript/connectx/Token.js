import Figure from "./Figure.js"

export default class Token extends Figure {
  constructor(posX, posY, radius, imagePath) {
    super(posX, posY)
    this.radius = radius
    this.image = new Image()
    this.image.src = imagePath
  }

  draw() {
    this.image.onload = () => {
      this.drawLogic()
    }
    this.drawLogic()
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
}
