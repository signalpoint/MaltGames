// ENTITY -> CIRCLE

class Circle extends MkShape {

  // PROPERTIES
  //  radius

  constructor(id, entity) {
    super(id, 'Circle', entity);
  }

  collidesWith(shape) {
//    var axes = shape.getAxes(),
//      distance;
//    if (axes === undefined) { // Circle
//      distance = Math.sqrt(
//        Math.pow(shape.x - this.x, 2) +
//        Math.pow(shape.y - this.y, 2)
//      );
//      return distance < Math.abs(this.radius + shape.radius);
//    }
//    else { // Polygon
//      return mk.polygonCollidesWithCircle(shape, this);
//    }
    return shape.type === 'MkCircle' ?
      mk.circleCollidesWithCircle(this, shape) :
      mk.polygonCollidesWithCircle(shape, this);
  }

  getAxes() { return undefined; }

  project(axis) {
    var scalars = [],
      dotProduct = new MkVector(this.x, this.y).dotProduct(axis);
    scalars.push(dotProduct);
    scalars.push(dotProduct + this.radius);
    scalars.push(dotProduct - this.radius);
//    console.log('axis', axis);
//    console.log('scalars', scalars);
//    console.log('point', point);
//    console.log('dotProduct', dotProduct);
    return new MkProjection(
      Math.min.apply(Math, scalars),
      Math.max.apply(Math, scalars)
    );
  }

  createPath() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  }

  draw() {

    context.save();
    this.createPath();
//    context.strokeStyle = this.strokeStyle;
    context.stroke();
//    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();

//    var ctx = game.getContext();
//
//    ctx.beginPath();
//
//    const circle = this.path2D();
//    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//
//    // TODO no sir, I don't link this. Now that we know more about the context,
//    // probably get rid of this property and rely on the draw/paint methodology instead.
//    if (this.ctx) {
//      for (const [prop, val] of Object.entries(this.ctx)) {
//        ctx[prop] = val;
//      }
//    }
//
//    ctx.fill(circle);

  }

  // AVAILABLE BEHAVIORS

  get fall() {
    return {
      animated: true,
      do: function(entity, time) {

//        entity.gravitySpeed += entity.gravity;
//        entity.x += entity.speedX;
//        entity.y += entity.speedY + entity.gravitySpeed;
//        if (entity.y > (game.getCanvas().height - entity.radius)) {
//          entity.animationTimer.stop();
//          entity.resetBehaviors();
//        }

        // Reposition
        entity.y += entity.velocityY / game.getFps();

        // Recalculate velocity
        entity.velocityY =
          game.getGravity() *
          (entity.animationTimer.getElapsedTime()/1000) *
          game.getPixelsPerMeter();

        // Hit bottom?
//        if (entity.y > (game.getCanvas().height - entity.radius)) {
//          entity.animationTimer.stop();
//          entity.velocityY = 0;
//          entity.resetBehaviors(); // TODO this seems shady!
//        }

      }
    };
  }

}
