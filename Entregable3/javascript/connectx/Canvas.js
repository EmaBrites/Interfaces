export default class Canvas {
  draggedFigure = null
  lastDruggedFigure = null
  figures = []

  constructor(canvasElementId, width, height) {
    this.canvas = document.getElementById(canvasElementId)
    this.context = this.canvas.getContext("2d")
    this.canvas.width = width
    this.canvas.height = height
  }

  addFigure(figure) {
    figure.setContext(this.context)
    this.figures.push(figure)
  }

  drawFigures() {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.figures.forEach((figure) => figure.draw())
  }

  startListeningMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.onMouseDown(e)
    })
    this.canvas.addEventListener("mousemove", (e) => {
      this.onMouseMove(e)
    })
    this.canvas.addEventListener("mouseup", (e) => {
      this.onMouseUp(e)
    })
  }

  onMouseDown(e) {
    const figure = this.figures.find((figure) =>
      figure.isMouseOver(e.offsetX, e.offsetY)
    )
    if (typeof figure !== "undefined") this.draggedFigure = figure
  }

  onMouseMove(e) {
    if (!this.draggedFigure) return

    this.draggedFigure.setPosition(e.offsetX, e.offsetY)
    this.drawFigures()
  }

  onMouseUp() {
    this.lastDraggedFigure = this.draggedFigure
    this.draggedFigure = null
  }

  addListener(eventName,callback){
    this.canvas.addEventListener(eventName,callback)
  }

  getLastDruggedFigure(){
    return this.lastDraggedFigure
  }
}
