var MkVector = function(x, y) {
  this.x = x;
  this.y = y;
};

MkVector.prototype = {

  getMagnitude: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  },
  add: function(vector) {
    return new MkVector(this.x + vector.x, this.y + vector.y);
  },
  subtract: function(vector) {
    return new MkVector(this.x - vector.x, this.y - vector.y);
  },
  dotProduct: function(vector) {
//    console.log(this.x + ' * ' + vector.y + ' + ' + this.y + ' * ' + vector.y);
    return (this.x * vector.x) + (this.y * vector.y);
  },
  edge: function(vector) {
    return this.subtract(vector);
  },
  perpendicular: function() {
    return new MkVector(this.y, 0 - this.x);
  },
  normalize: function() {
    var v = new MkVector(0, 0),
      m = this.getMagnitude();
    if (m != 0) {
      v.x = this.x / m;
      v.y = this.y / m;
    }
    return v;
  },
  normal: function() {
    return this.perpendicular().normalize();
  },

};
