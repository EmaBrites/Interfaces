export default class Figure {
  isSelected = false
  constructor(posX, posY, context) {
    this.posX = posX
    this.posY = posY
    this.context = context
  }

  draw() {
    throw new Error("Method 'draw()' must be implemented.")
  }

  setPosition(x, y) {
    console.log(`(${x},${y})`)
    this.posX = x
    this.posY = y
  }

  isMouseOver() {
    return true
  }

  setIsSelected(isSelected) {
    this.isSelected = isSelected
  }

  isSelected() {
    return this.isSelected
  }
}