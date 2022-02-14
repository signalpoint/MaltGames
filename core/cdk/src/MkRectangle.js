// TODO this is a Polygon, it should extend MkPolygon, right?
class MkRectangle extends MkShape {

  // PROPERTIES
  //
  //  width
  //  height
  //

  constructor(id, entity) {
    super(id, 'MkRectangle', entity);
  }

  createPath() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y);
    context.lineTo(this.x + this.width, this.y + this.height);
    context.lineTo(this.x, this.y + this.height);
//    context.strokeRect(this.x, this.y, this.width, this.height);
    context.closePath();
  }

  draw() {

    context.save();
    this.createPath();
//    context.strokeStyle = this.strokeStyle;
    context.stroke();
//    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();

//    context.beginPath();
//    context.moveTo(RUBBER.origin.x, RUBBER.origin.y);
//    context.strokeRect(RUBBER.shape.x, RUBBER.shape.y, RUBBER.shape.width, RUBBER.shape.height);
//    context.stroke();
  }

}
