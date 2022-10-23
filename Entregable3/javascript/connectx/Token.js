import Figure from "./Figure.js"

export default class Token extends Figure {
  constructor(posX, posY, context, radius) {
    super(posX, posY, context)
    this.radius = radius
  }

  draw() {
    this.context.fillStyle = "red"
    this.context.beginPath()
    this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
    this.context.fill()
    this.context.closePath()
  }
}
