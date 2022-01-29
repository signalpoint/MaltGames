mk.Mod = function(id, mod) {

  this._id = id;
  this._namespace = null;
  this._class = null;
  this._name = null;
  this._path = null;
  this._description = null;
  this._files = null;
  this._api = null;

  if (mod.namespace) { this._namespace = mod.namespace; }
  if (mod.class) { this._class = mod.class; }
  if (mod.name) { this._name = mod.name; }
  if (mod.path) { this._path = mod.path; }
  if (mod.description) { this._description = mod.description; }
  if (mod.files) { this._files = mod.files; }
  if (mod.api) { this._api = mod.api; }

  // proxy helpers
  this.id = function() {
    return this.getId();
  };

  // VARIABLES...

  this.getId = function() {
    return this._id;
  };

  this.getNamespace = function() {
    return this._namespace;
  };

  this.getClass = function() {
    return this._class;
  };

  this.getName = function() {
    return this._name;
  };

  this.getPath = function() {
    return this._path;
  };

  this.getDescription = function() {
    return this._description;
  };

  this.getFiles = function() {
    return this._files;
  };

  this.load = function() {
    var files = this.getFiles();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(file);
      // TODO load it!
    }
  };

  this.getApi = function() {
    return this._api;
  };

};
// TODO rename to routes()
//public function getRoutes() {
//  return NULL;
//}
//
//public function rest() {
//  return NULL;
//}
//
//public function api($resource, $method, $data = NULL) {
//
//}
