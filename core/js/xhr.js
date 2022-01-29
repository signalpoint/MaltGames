mk.xhr = function(method, path, data, options) {

  return new Promise(function(ok, error) {

    var url = location.protocol + '//' + location.host + '/' + path;
//    console.log(url);

    var req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('Content-type', 'application/json');
    req.onload = function() {
//      console.log(req);

      // TODO need to understand what is coming back (maybe need to use Accept header by client)
      // that way we can properly parse the response here, e.g. JSON vs audio/mpeg
      var result = null;
      if (path.indexOf('sound') != -1) {
        result = req.response;
      }
      else {
        result = JSON.parse(req.responseText);
      }

      req.status === 200 ?
        ok(result) :
        error(new Error(result.error.code + ' - ' + result.error.msg));

    };
    req.onerror = function() {

      console.log(req);
      error(new Error('xhr'));

    };

    data ? req.send(JSON.stringify(data)) : req.send();

  });

};
