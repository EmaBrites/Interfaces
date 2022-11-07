export default class Canvas {
  draggedFigure = null
  lastDruggedFigure = null
  figures = []
  backgroundColor
  mouseUpCallbacks = []
  timer = null

  constructor(canvasElementId, width, height, backgroundColor,imagePath) {
    this.canvas = document.getElementById(canvasElementId)
    this.context = this.canvas.getContext("2d")
    this.canvas.width = width
    this.canvas.height = height
    this.backgroundColor = backgroundColor
    this.image = new Image()
    this.image.src = imagePath
    this.image.onload = () => this.drawFigures()
    this.interval =setInterval(() => this.drawFigures(), 1000)
  }

  addFigure(figure) {
    figure.setContext(this.context)
    this.figures.push(figure)
  }

  setTimer(timer) {
    this.timer = timer
  }

  drawFigures() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.fillStyle = this.backgroundColor
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    this.figures.forEach((figure) => figure.draw())
    this.timer.draw(this.context)
    if (this.timer.isOver()) {
      this.drawGameOver()
    }
  }

  startListeningMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.onMouseDown(e)
    })
    this.canvas.addEventListener("mousemove", (e) => {
      this.onMouseMove(e)
    })
    document.addEventListener("mouseup", (e) => {
      this.onMouseUp(e)
    })
  }

  onMouseDown(e) {
    const figure = this.figures.find((figure) =>
      figure.canBeDragged() && figure.isMouseOver(e.offsetX, e.offsetY)
    )
    if (typeof figure !== "undefined") this.draggedFigure = figure
    if (typeof figure !== "ResetButton") this.reset()
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
    clearInterval(this.interval)
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
    this.context.font = "30px Silkscreen"
    this.context.fillStyle = "white"
    this.context.fillText(message, 10, 40) 
  }

  reset() {
    document.getElementById("game").classList.add("hidden")
    document.querySelectorAll(".game-mode-button").forEach((element) => {
      element.classList.remove("hidden")
    })
    clearInterval(this.interval)
  }
}
