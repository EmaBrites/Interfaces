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
      this.context.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
    }
    this.context.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
  }
  
}
