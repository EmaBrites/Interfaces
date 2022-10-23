import Figure from "./Figure.js"

export default class Token extends Figure {
  constructor(posX, posY, context, radius, imagePath) {
    super(posX, posY, context)
    this.radius = radius
    this.image = new Image()
    this.image.src = imagePath
  }

  draw() {
    this.image.onload = () => {
      this.context.drawImage(this.image, 0, 0)
      this.context.beginPath()
    }
  }
}
