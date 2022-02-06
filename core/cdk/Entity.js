class Entity {

  constructor(id, type, entity) {

    this._id = id;
    this._type = type;

//    this._Path2D = new Path2D();

    this._ctx = null;

    // COORDS

    this._x = null;
    this._y = null;

    // VELOCITY

    this._vX = 0;
    this._vY = 0;

    // GRAVITY

    this._gravity = 0;

    // BEHAVIORS

    this._behaviors = [];

    // ANIMATION TIMER

    this._animationTimer = null;

    // INCOMING PROPERTIES

    // Attach any incoming entity properties to this.
    if (entity) {
      for (const [property, value] of Object.entries(entity)) {
        this['_' + property] = value;
      }
    }

  }

  // METHODS

  get id() { return this._id; }
  get type() { return this._type; }

//  get path2D() { return this._Path2D; }
  path2D() { return new Path2D(); }

  get ctx() { return this._ctx; }

  // position

  get x() { return this._x; }
  set x(x) { this._x = x; }

  get y() { return this._y; }
  set y(y) { this._y = y; }

  // velocity

  get velocityX() { return this._vX; }
  set velocityX(vX) { this._vX = vX; }

  get velocityY() { return this._vY; }
  set velocityY(vY) { this._vY = vY; }

  // gravity

  get gravity() { return this._gravity; }
  set gravity(g) { this._gravity = g; }

//  get gravityX() { return this._gX; }
//  set gravityX(gX) { this._gX = gX; }
//
//  get gravityY() { return this._gY; }
//  set gravityY(gY) { this._gY = gY; }

//  get gravitySpeed() { return this._gravitySpeed; }
//  set gravitySpeed(speed) { this._gravitySpeed = speed; }

  // speed

//  get speedX() { return this._speedX; }
//  set speedX(speedX) { this._speedX = speedX; }
//
//  get speedY() { return this._speedY; }
//  set speedY(speedY) { this._speedY = speedY; }

  enableGravity() { this._gravity = true; }
  disableGravity() { this._gravity = false; }
  gravityEnabled() { return this._gravity; }

  // behaviors

  get behaviors() { return this._behaviors; }
  set behaviors(behaviors) { this._behaviors = behaviors; }
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
  resetBehaviors() { this._behaviors = []; }

  // animation timer

  get animationTimer() { return this._animationTimer; }
  set animationTimer(animationTimer) { return this._animationTimer = animationTimer; }

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
