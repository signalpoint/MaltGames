mk.api = function(method, path, data, options) {
  path = 'api/' + path;
  return this.xhr(method, path, data, options);
};

mk.apiGet = function(path, options) {
  return this.api('GET', path, null, options);
};

mk.apiPost = function(path, data, options) {
  return this.api('POST', path, data, options);
};
