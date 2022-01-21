Game.prototype.xhr = function(method, path, data, options) {
  return new Promise(function(resolve, reject) {
    var url = location.protocol + '//' + location.host + '/malt/' + path;
    var req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('Content-type', 'application/json');
    req.onload = function() {
//      console.log(req);

//      var result = JSON.parse(req.responseText);

      var result = null;
      if (path.indexOf('sound') != -1) {
        result = req.response;
      }
      else {
        result = JSON.parse(req.responseText);
      }

      req.status === 200 ?
        resolve(result) :
        reject(new Error(result.error.code + ' - ' + result.error.msg));
    };
    req.onerror = function() {
      console.log(req);
      reject(new Error('xhr'));
    };
    data ? req.send(JSON.stringify(data)) : req.send();
  });
};
