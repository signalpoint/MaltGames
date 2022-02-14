class MkShape extends MkEntity {

  // PROPERTIES
  //
  //  strokeStyle
  //  fillStyle
  //

  constructor(id, type, entity) {
    super(id, type, entity);
  }

  collidesWith(shape) {
    return !this.separationOnAxes(
      this.getAxes().concat(shape.getAxes()),
      shape
    );
  }

  separationOnAxes(axes, shape) {
    for (var i = 0; i < axes.length; i++) {
      var p1 = shape.project(axes[i]);
      var p2 = this.project(axes[i]);
      if (!p1.overlaps(p2)) { return true; }
    }
    return false;
  }

  minimumTranslationVector(axes, shape) {
    var minimumOverlap = 100000,
      overlap,
      axisWithSmallestOverlap;
    for (var i = 0; i < axes.length; i++) {
      var axis = axes[i];
      var p1 = shape.project(axis);
      var p2 = this.project(axis);
      overlap = p1.overlaps(p2);
      if (overlap === 0) {
        return { // No collision
          axis: undefined,
          overlap: 0
        };
      }
      if (overlap < minimumOverlap) {
        minimumOverlap = overlap;
        axisWithSmallestOverlap = axis;
      }
    }
    return { // Collision
      axis: axisWithSmallestOverlap,
      overlap: minimumOverlap
    };
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

  isPointInPath(x, y) {
    this.createPath();
    return context.isPointInPath(x, y);
  }

  // PROXIES

  mtv(axes, shape) {
    return this.minimumTranslationVector(axes, shape);
  }

  // INTERFACES

  createPath() {

  }

  project() {

  }

  getAxes() {

  }

}

mk.shapeTypes = function() {
  return [
    'Circle',
    'MkRectangle',
    'MkPolygon',
  ];
};
