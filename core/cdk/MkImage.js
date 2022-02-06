class MkImage extends Entity {

  // PROPERTIES
  //  width
  //  height
  //  src
  //  img

  constructor(id, entity) {
    super(id, 'Image', entity);
  }

  // METHODS

  get width() { return this._width; }
  get height() { return this._height; }
  get src() { return this._src; }
  get img() { return this._img; }

  // INTERFACE

  draw() {

//context.imageSmoothingEnabled = true;
//context.imageSmoothingQuality = 'high';

    // IMAGE

    // TODO the loading should take place at game start, not in the draw!
    var img = this._img;
    if (!img) { // load and save to memory...
      var self = this;
      img = new Image();
      img.onload = function() {
        self._img = img;
        self.render();
      };
      img.src = this.src;
    }
    else { // from memory...
      this.render();
    }

  }

  render() {

    // IMAGE
    game.getContext().drawImage(this.img, this.x, this.y);

//      game.getContext().drawImage(img, this.x, this.y);
//      game.getContext().drawImage(img, this.x, this.y, this.width * 2, this.height * 2);
//      game.getContext().drawImage(img, this.x, this.y, this.width / 2, this.height / 2);

  }

}
