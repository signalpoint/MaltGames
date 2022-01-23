Game.prototype.api = function(method, path, data, options) {
  path = 'api/' + this.getKey() + '/' + path;
  return this.xhr(method, path, data, options);
};

Game.prototype.apiGet = function(path, options) {
  return this.api('GET', path, null, options);
};

Game.prototype.apiPost = function(path, data, options) {
  return this.api('POST', path, data, options);
};
