// ENTITY -> CIRCLE

class Circle extends Entity {

  // PROPERTIES
  //  radius

  constructor(id, entity) {
    super(id, 'Circle', entity);
  }

  // METHODS

//  get radius() { return this.radius; }

  // INTERFACE

  draw() {

    var ctx = game.getContext();

    ctx.beginPath();

    const circle = this.path2D();
    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    for (const [prop, val] of Object.entries(this.ctx)) {
      ctx[prop] = val;
    }

    ctx.fill(circle);

  }

  // BEHAVIORS

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
