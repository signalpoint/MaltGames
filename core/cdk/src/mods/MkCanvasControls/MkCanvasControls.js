class MkCanvasControls extends MkMod {

  constructor() {
    super('MkCanvasControls');
  }

  init() {

    // Init mouse.
    canvas.addEventListener('mousemove', mk.canvasControlsMouseMove);
    canvas.addEventListener('mousedown', mk.canvasControlsMouseDown);
    canvas.addEventListener('mouseup', mk.canvasControlsMouseUp);

  }

}

// MOUSE DOWN

// TODO rename this to canvasMouseDown(); having "controls" mentioned is very misleading!
// Do the same w/ related functions below too.
mk.canvasControlsMouseDown = function(e) {

  e.preventDefault();
  var x = e.offsetX;
  var y = e.offsetY;

//  console.log('click', x, y);

  if (game.isPaused()) {

    switch (CANVAS_CTRL_OP) {

      case 'pointer':
        pointerMouseDown(x, y, e);
        break;

      case 'drawCircle':
      case 'drawRectangle':
      case 'drawPolygon':

        if (!RUBBER.origin) {
          RUBBER.origin = new MkPoint(x, y);
          RUBBER.shape = {};
          console.log('RUBBER.origin', CANVAS_CTRL_OP, RUBBER.origin);
          game.saveCanvasDrawingArea();
          RUBBER.stretching = true;
        }

        switch (CANVAS_CTRL_OP) {
          case 'drawCircle':
            RUBBER.shapeName = 'circle';
            drawCircleMouseDown(x, y, e);
            break;
          case 'drawRectangle':
            RUBBER.shapeName = 'rectangle';
            drawRectangleMouseDown(x, y, e);
            break;
          case 'drawPolygon':
            RUBBER.shapeName = 'polygon';
            drawPolygonMouseDown(x, y, e);
            break;
        }

        break;

    }

    return;

  }

};

// MOUSE MOVE

mk.canvasControlsMouseMove = function(e) {

  e.preventDefault();

//    console.log(e.offsetX, e.offsetY);

  var x = e.offsetX;
  var y = e.offsetY;

  // Hang onto the last mouse coordinates.
  game.setMouseX(x);
  game.setMouseY(y);

  if (game.isPaused()) {

    if (RUBBER.stretching) {

      var loc = new MkPoint(x, y);

      switch (CANVAS_CTRL_OP) {

        case 'drawCircle':
        case 'drawRectangle':
        case 'drawPolygon':

          game.restoreCanvasDrawingArea();

          switch (CANVAS_CTRL_OP) {
            case 'drawCircle': drawCircleMouseMove(loc, e); break;
            case 'drawRectangle': drawRectangleMouseMove(loc, e); break;
            case 'drawPolygon': drawPolygonMouseMove(loc, e); break;
          }

          break;

      }

      drawGuideWires(loc);

    }

    else {

      if (CANVAS_CTRL_OP == 'pointer') {
        pointerMouseMove(new MkPoint(x, y), e);
      }

    }

  }

  // The game is not paused...

};

// MOUSE UP

mk.canvasControlsMouseUp = function(e) {

  e.preventDefault();
  var x = e.offsetX;
  var y = e.offsetY;

//  console.log('release', x, y);

  if (game.isPaused()) {

    switch (CANVAS_CTRL_OP) {

        case 'drawCircle':
        case 'drawRectangle':
        case 'drawPolygon':

          game.restoreCanvasDrawingArea();

          switch (CANVAS_CTRL_OP) {
            case 'drawCircle': drawCircleMouseUp(x, y, e); break;
            case 'drawRectangle': drawRectangleMouseUp(x, y, e); break;
            case 'drawPolygon': drawPolygonMouseUp(x, y, e); break;
          }

          game.addEntity(RUBBER.drawnShape);

          RUBBER.clear();

          break;

      }

    switch (CANVAS_CTRL_OP) {

      case 'pointer':
        pointerMouseUp(x, y, e);
        break;

    }

    return;

  }

};
