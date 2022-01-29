mk.Route = function(id, route) {

  this._id = id;
  this._path = null;
  this._require = null;
  this._page = null;

  if (route.path) { this._path = route.path; }
  if (route.require) { this._require = route.require; }
  if (route.page) { this._page = new mk.Page(id, route.page); }

  // proxy helpers
  this.id = function() {
    return this.getId();
  };

  // VARIABLES...

  this.getId = function() {
    return this._id;
  };

  this.getPath = function() {
    return this._path;
  };

  this.getRequire = function() {
    return this._require;
  };
  this.hasRequire = function() {
    return !!this.getRequire();
  };
  this.loadRequire = function() {
    var require = this.getRequire();
    for (var i = 0; i < require.length; i++) {
      var file = require[i];
      console.log(file);
      // TODO load it!
    }
  };

  this.getPage = function() {
    return this._page;
  };

};
