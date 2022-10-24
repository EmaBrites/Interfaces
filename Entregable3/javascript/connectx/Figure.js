export default class Figure {
  constructor(posX, posY, imagePath) {
    this.posX = posX
    this.posY = posY
    this.initialPosX = posX
    this.initialPosY = posY
    this.image = new Image()
    this.image.src = imagePath
    this.drag = true
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

  getPosition() {
    return { posX: this.posX, posY: this.posY }
  }

  restorePosition() {
    this.setPosition(this.initialPosX, this.initialPosY)
  }

  disableDragging(){
    this.drag = false
  }

  canBeDragged(){
    return this.drag
  }
}