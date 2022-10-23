export default class Figure {
  constructor(posX, posY, context) {
    this.posX = posX
    this.posY = posY
    this.context = context
  }

  draw() {
    throw new Error("Method 'draw()' must be implemented.")
  }
}