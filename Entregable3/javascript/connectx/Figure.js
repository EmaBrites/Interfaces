export default class Figure {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
  }

  setContext(context) {
    this.context = context
  }

  draw() {
    throw new Error("Method 'draw()' must be implemented.")
  }

  setPosition(x, y) {
    this.posX = x
    this.posY = y
  }

  isMouseOver(x, y) {
    return (
      Math.sqrt(Math.pow(this.posX - x, 2) + Math.pow(this.posY - y, 2)) <
      this.radius
    )
  }
}