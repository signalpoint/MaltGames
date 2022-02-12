class MkPolygon extends MkEntity {

  // PROPERTIES
  //
  //  radius
  //  sides
  //  startAngle
  //
  //  points
  //

  constructor(id, entity) {
    super(id, 'MkPolygon', entity);
  }

  addPoints() {

      this.points = [];

      var angle = this.startAngle || 0;
      for (var i = 0; i < this.sides; i++) {
        this.points.push(new MkPoint(
          this.x + this.radius * Math.sin(angle),
          this.y - this.radius * Math.cos(angle)
        ));
        angle += 2 * Math.PI / this.sides;
      }

    return this.points.length ? this.points : null;

  }

  createPath() {

    this.addPoints();
    var points = this.points;

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < this.sides; i++) {
      context.lineTo(points[i].x, points[i].y);
    }

    context.closePath();

  }

  stroke() {
    context.save();
    this.createPath();
    context.strokeStyle = this.strokeStyle;
    context.stroke();
    context.restore();
  }

  fill() {
    context.save();
    this.createPath();
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }

  draw() {
    context.save();
    this.createPath();
    context.strokeStyle = this.strokeStyle;
    context.stroke();
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }

}
