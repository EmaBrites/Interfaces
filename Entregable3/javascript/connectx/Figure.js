export default class Figure {
  constructor(posX, posY, imagePath) {
    this.posX = posX
    this.posY = posY
    this.image = new Image()
    this.image.src = imagePath
  }

  setContext(context) {
    this.context = context
  }

  draw() {
    this.image.onload = () => {
      this.drawLogic()
    }
    this.drawLogic()
  }

  drawLogic() {
    throw new Error("Method 'drawLogic()' must be implemented.")
  }

  isMouseOver(x, y) {
    throw new Error("Method 'isMouseOver()' must be implemented.")
  }

  setPosition(x, y) {
    this.posX = x
    this.posY = y
  }
}