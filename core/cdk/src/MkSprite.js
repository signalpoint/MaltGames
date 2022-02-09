class MkSprite extends MkEntity {

  // PROPERTIES
  //  width {Number}
  //  height {Number}
  //  sheet {String} The active sheet name
  //  sheets {Object} Stores sheets by name. A sheet has these properties:
  //
  //    frameWidth
  //    frameHeight
  //    frames
  //    rows
  //    cols
  //    row
  //    col
  //    currentFrame
  //

  constructor(id, entity) {
    super(id, 'Sprite', entity);
  }

  // METHODS

//  get width() { return this.width; }
//  get height() { return this.height; }

//  get sheets() { return this.sheets; }
//  get sheet() { return this.sheet; }

  loadSheets(ok) {

//    console.log('sheets', Object.keys(this.sheets).length);

//    for (const [sheetName, sheet] of Object.entries(this.sheets)) {
//      console.log(sheetName, sheet);
//      sheet.img = new Image();
//      sheet.img.onload = function() {
//        console.log('loaded', this.getAttribute('data-name'));
//      };
//      sheet.img.setAttribute('data-name', sheetName);
//      sheet.img.src = sheet.src;
//    }

    var numLoading = Object.keys(this.sheets).length;
    const onload = () => --numLoading === 0 && ok();
    for (const [sheetName, sheet] of Object.entries(this.sheets)) {
      const img = sheet.img = new Image;
      img.src = sheet.src;
      img.onload = onload;
    }
//    const onload = function() {
//
//      console.log('loaded', this.getAttribute('data-name'));
//      numLoading--;
//      if (numLoading === 0) {
//        ok();
//      }
//    };
//    var i = 0;
//    const images = {};
//    for (const [sheetName, sheet] of Object.entries(this.sheets)) {
//      console.log(sheetName, sheet.src);
//      images[i] = this.sheets[sheetName].img = new Image;
//      images[i].setAttribute('data-name', sheetName);
//      images[i].onload = onload;
//      images[i].src = sheet.src;
//      i++;
//    }
//    while (i < names.length) {
//        const img = images[names[i]] = new Image;
//        img.src = files[i++] + ".png";
//        img.onload = onload;
//    }
//    return images;

  }

  animate(sheetName) {
    this.sheet = sheetName;
  }

  // INTERFACE

  draw() {

    var sheet = this.sheets[this.sheet];

    var img = sheet.img;
    if (!img) { return; }

//context.imageSmoothingEnabled = true;
//context.imageSmoothingQuality = 'high';

    // SPRITE SHEET

    if (game.getGameTime() % (game.getFps() / sheet.frames) === 0) {

//      console.log('new frame', game.getGameTime(), game.getFps() / this.frames);

      // Pick a new frame
      sheet.currentFrame++;

      // Make the frames loop
      let maxFrame = sheet.cols * sheet.rows - 1;
      if (sheet.currentFrame > maxFrame){
        sheet.currentFrame = 0;
      }

      // Update rows and columns
      sheet.col = sheet.currentFrame % sheet.cols;
      sheet.row = Math.floor(sheet.currentFrame / sheet.cols);

    }

    game.getContext().drawImage(
      img,
      sheet.col * sheet.frameWidth,
      sheet.row * sheet.frameHeight,
      sheet.frameWidth,
      sheet.frameHeight,
      this.x,
      this.y,
      sheet.frameWidth,
      sheet.frameHeight
    );

  }

}
