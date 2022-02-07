class MkEntity {

  constructor(id, type, entity) {

    this.id = id;
    this.type = type;

    this.ctx = null;

    // COORDS

    this.x = null;
    this.y = null;

    // VELOCITY

    this.vX = 0;
    this.vY = 0;

    // GRAVITY

    this.gravity = 0;

    // BEHAVIORS

    this.behaviors = [];

    // ANIMATION TIMER

    this.animationTimer = null;

    // INCOMING PROPERTIES

    // Attach any incoming entity properties to this.
    if (entity) {
      for (const [property, value] of Object.entries(entity)) {
        //this['_' + property] = value;
        this[property] = value;
      }
    }

  }

  // METHODS

//  get id() { return this.id; }
//  set id(id) { this.id = id; }

//  get type() { return this.type; }
//  set type(type) { this.type = type; }

//  get path2D() { return this._Path2D; }
  path2D() { return new Path2D(); }

//  get ctx() { return this.ctx; }
//  set ctx(ctx) { this.ctx = ctx; }

  // position

//  get x() { return this.x; }
//  set x(x) { this.x = x; }

//  get y() { return this.y; }
//  set y(y) { this.y = y; }

  // velocity

//  get velocityX() { return this.vX; }
//  set velocityX(vX) { this.vX = vX; }

//  get velocityY() { return this.vY; }
//  set velocityY(vY) { this.vY = vY; }

  // gravity

//  get gravity() { return this.gravity; }
//  set gravity(g) { this.gravity = g; }

  // behaviors

//  get behaviors() { return this.behaviors; }
//  set behaviors(behaviors) { this.behaviors = behaviors; }
  addBehaviors(behaviors) {
    for (var i = 0; i < behaviors.length; i++) {
      this.addBehavior(behaviors[i]);
    }
  }
  addBehavior(behavior) {
    if (behavior.animated && !this.animationTimer) {
      this.animationTimer = new AnimationTimer();
      console.log('added timer to ' + this.id);
    }
    this.behaviors.push(behavior);
  }
  resetBehaviors() { this.behaviors = []; }

  // animation timer

//  get animationTimer() { return this.animationTimer; }
//  set animationTimer(animationTimer) { return this.animationTimer = animationTimer; }

  // movement

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  moveUp(y) {
    if (!y) { y = 1; }
    this.move(this.x, this.y - y);
  }

  moveDown(y) {
    if (!y) { y = 1; }
    this.move(this.x, this.y + y);
  }

  moveLeft(x) {
    if (!x) { x = 1; }
    this.move(this.x - x, this.y);
  }

  moveRight(x) {
    if (!x) { x = 1; }
    this.move(this.x + x, this.y);
  }

  // INTERFACES

  draw() {}

}
