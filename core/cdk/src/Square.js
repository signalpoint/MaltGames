// ENTITY -> POLYGON -> SQUARE

class Square extends Polygon {

  // PROPERTIES
  //  length

  constructor(id, entity) {
    super(id, entity);
    this.type = 'Square';
  }

  // METHODS

//  get length() { return this.length; }

  // INTERFACE

  draw() {

    var ctx = game.getContext();

    ctx.beginPath();

//    const square = this.path2D;
    const square = this.path2D();
    square.rect(this.x, this.y, this.length, this.length);

    for (const [prop, val] of Object.entries(this.ctx)) {
      ctx[prop] = val;
    }

    ctx.stroke(square);

  }

  // AVAILABLE BEHAVIORS

  get fall() {
    return {
      animated: true,
      do: function(entity, time) {

//        entity.gravitySpeed += entity.gravity;
//        entity.x += entity.speedX;
//        entity.y += entity.speedY + entity.gravitySpeed;
//        if (entity.y > (game.getCanvas().height - entity.length)) {
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
        if (entity.y > (game.getCanvas().height - entity.length)) {
          entity.animationTimer.stop();
          entity.velocityY = 0;
          entity.resetBehaviors(); // TODO this seems shady!
        }

      }
    };
  }

}
