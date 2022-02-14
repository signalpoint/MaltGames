class MkPolygon extends MkShape {

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

  collidesWith(shape) {
//    var axes = shape.getAxes();
//    if (axes === undefined) { // Circle
//      return mk.polygonCollidesWithCircle(this, shape);
//    }
//    else { // Polygon
//      axes.concat(this.getAxes());
//      return !this.separationOnAxes(axes, shape);
//    }
    return shape.type === 'MkCircle' ?
      mk.polygonCollidesWithCircle(this, shape) :
      mk.polygonCollidesWithPolygon(this, shape);
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

  addPoint(x, y) {
    this.poins.push(new MkPoint(x, y));
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

//  stroke() {
//    context.save();
//    this.createPath();
//    context.strokeStyle = this.strokeStyle;
//    context.stroke();
//    context.restore();
//  }
//
//  fill() {
//    context.save();
//    this.createPath();
//    context.fillStyle = this.fillStyle;
//    context.fill();
//    context.restore();
//  }

  getAxes() {

    var v1 = new MkVector(),
      v2 = new MkVector(),
      axes = [];

    for (var i = 0; i < this.points.length - 1; i++) {
      v1.x = this.points[i].x;
      v1.y = this.points[i].y;
      v2.x = this.points[i + 1].x;
      v2.y = this.points[i + 1].y;
      axes.push(v1.edge(v2).normal());
    }

    v1.x = this.points[this.points.length - 1].x;
    v1.y = this.points[this.points.length - 1].y;
    v2.x = this.points[0].x;
    v2.y = this.points[0].y;
    axes.push(v1.edge(v2).normal());

    return axes;

  }

  project(axis) {

    var scalars = [],
      v = new MkVector();

    for (var i = 0; i < this.points.length - 1; i++) {
      v.x = this.points[i].x;
      v.y = this.points[i].y;
      scalars.push(v.dotProduct(axis));
    }

    return new MkProjection(
      Math.min.apply(Math, scalars),
      Math.max.apply(Math, scalars)
    );

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
