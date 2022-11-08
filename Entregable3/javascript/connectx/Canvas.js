import Gametext from "./GameText.js";

export default class Canvas {
  draggedFigure = null
  lastDruggedFigure = null
  figures = []
  backgroundColor
  mouseUpCallbacks = []
  timer = null
  resetButton
  turn = new Gametext(415, 90, "Player 1")

  constructor(canvasElementId, width, height, backgroundColor,imagePath,resetCallback) {
    this.canvas = document.getElementById(canvasElementId)
    this.context = this.canvas.getContext("2d")
    this.canvas.width = width
    this.canvas.height = height
    this.backgroundColor = backgroundColor
    this.resetCallback = resetCallback
    this.image = new Image()
    this.image.src = imagePath
    this.image.onload = () => this.drawFigures()
  }

  addFigure(figure) {
    figure.setContext(this.context)
    this.figures.push(figure)
  }

  setTimer(timer) {
    this.timer = timer
  }

  setResetButton(resetButton) {
    this.resetButton = resetButton
    this.resetButton.setContext(this.context)
  }

  setPlayerTurn(player){
    this.turn.setText(`Player ${player}`)
  }

  drawFigures() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    this.timer.draw(this.context)
    this.turn.draw(this.context)
    this.resetButton.draw()
    this.figures.forEach((figure) => figure.draw())
  }

  startListeningMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.onMouseDown(e)
    })
    this.move = (e) => this.onMouseMove(e)
    this.canvas.addEventListener("mousemove", this.move)
    this.up = (e) => this.onMouseUp(e)
    document.addEventListener("mouseup", this.up)
  }

  onMouseDown(e) {
    const figure = this.figures.find((figure) =>
      figure.canBeDragged() && figure.isMouseOver(e.offsetX, e.offsetY)
    )
    if (typeof figure !== "undefined"){
      this.draggedFigure = figure
    }
    if (this.resetButton.isMouseOver(e.offsetX, e.offsetY)) this.reset()  
  }

  onMouseMove(e) {
    if (!this.draggedFigure) return

    this.draggedFigure.setPosition(e.offsetX, e.offsetY)
    this.drawFigures()
  }

  onMouseUp() {
    this.lastDraggedFigure = this.draggedFigure
    this.draggedFigure = null
    if(this.lastDraggedFigure)
      this.mouseUpCallbacks.forEach((callback) => callback())
    
  }

  addMouseUpListener(callback) {
    this.mouseUpCallbacks.push(callback)
  }

  getLastDruggedFigure() {
    return this.lastDraggedFigure
  }

  getWidth() {
    return this.canvas.width
  }

  drawGameOver(message) {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    this.context.font = "30px Silkscreen"
    this.context.fillStyle = "white"
    this.context.fillText(message, 10, 40) 
    this.figures.forEach((figure) => figure.draw())
    this.resetButton.draw()
  }

  reset() {
    this.resetCallback()
  }

  removeEventListeners(){
    this.canvas.removeEventListener("mousemove", this.move)
    this.mouseUpCallbacks = []
  }
}
