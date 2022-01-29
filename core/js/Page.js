// TODO
//
//   - careful, adding JS and CSS dynamically may be an async operation, so we may need to wait for it to finish!

mk.Page = function(id, page) {
//  console.log(id, page);

  this._id = id;

  var head = page.head ? page.head : {};
  var body = page.body ? page.body : {};

  // <head>
  this._title = '';
  this._metas = [];
  this._scripts = [];
  this._links = [];
  // </head>

  // <body>
  this._bodyFilePath = body.file ? body.file : null;
  this._bodyAttributes = body.attributes ? body.attributes : null;
  this._content = [];
  this._bottomScripts = [];
  // </body>

  // HEAD
  for (const [type, item] of Object.entries(head)) {
    switch (type) {
      case 'title':
        this._title = item;
        break;
      case 'metas':
        this._metas = item;
        break;
      case 'scripts':
        this._scripts = item;
        break;
      case 'links':
        this._links = item;
        break;
    }
  }

  // BODY
  for (const [type, item] of Object.entries(body)) {
    switch (type) {
      case 'scripts':
        this._bottomScripts = item;
        break;
    }
  }

  // CONTROLLER

  this._controller = page.controller ?
    page.controller :
    null;

  // CONTENT TEMPLATE

  this._contentTemplate = page.contentTemplate ?
    page.contentTemplate :
    null;

  // PROXIES

  this.id = function() {
    return this.getId();
  };
  this.addJs = function(script) {
    this.addScript(script);
  };
  this.addCss = function(link) {
    this.addLink(link);
  };
  this.getData = function() {
    return this.hasControllerData() ? this.getControllerData() : null;
  };
  this.getHead = function() {
    return document.getElementsByTagName('head')[0];
  };
  this.getBody = function() {
    return document.getElementsByTagName('body')[0];
  };

  // VARIABLES

  this.getId = function() {
    return this._id;
  };

  this.getTitle = function() {
    return this._title;
  };
  this.setTitle = function(title) {
    this._title = title;
  };

  // META TAGS

  this.getMetas = function() {
    return this._metas;
  };
  this.setMetas = function(metas) {
    this._metas = metas;
  };
  this.addMetaTags = function(metaTags) {
    for (var i = 0; i < metaTags.length; i++) {
      this.addMetaTag(metaTags[i]);
    }
  };
  this.addMetaTag = function(metaTag) {
    this._metas.push(metaTag);
  };
  this.addMetaTagsAtFront = function(metaTags) {
    for (var i = 0; i < metaTags.length; i++) {
      this.addMetaTagAtFront(metaTags[i]);
    }
  };
  this.addMetaTagAtFront = function(metaTag) {
    this._metas.unshift(metaTag);
  };
  this.refreshMetaTags = function() {
    var head = this.getHead();
    var metaTags = this.getMetas(); // TODO rename this whole variable/methods to "metaTags" instead!
    for (var i = 0; i < metaTags.length; i++) {
      var meta = document.createElement('meta');
      for (const [name, val] of Object.entries(metaTags[i])) {
        meta[name] = val;
      }
      console.log('adding meta tag', meta);
      head.appendChild(meta);
    }
  };

  // SCRIPTS

  this.getScripts = function() {
    return this._scripts;
  };
  this.setScripts = function(scripts) {
    this._scripts = scripts;
  };
  this.addScripts = function(scripts) {
    for (var i = 0; i < scripts.length; i++) {
      this.addScript(scripts[i]);
    }
  };
  this.addScript = function(script) {
    this._scripts.push(script);
  };
  this.addScriptsAtFront = function(scripts) {
    for (var i = 0; i < scripts.length; i++) {
      this.addScriptAtFront(scripts[i]);
    }
  };
  this.addScriptAtFront = function(script) {
    this._scripts.unshift(script);
  };
  this.refreshScripts = function() {
    var head = this.getHead();
    var scripts = this.getScripts();
    for (var i = 0; i < scripts.length; i++) {
      var script = document.createElement('script');
      for (const [name, val] of Object.entries(scripts[i])) {
        script[name] = val;
      }
      console.log('adding script', script);
      head.appendChild(script);
    }
  };

  // LINKS

  this.getLinks = function() {
    return this._links;
  };
  this.setLinks = function(links) {
    this._links = links;
  };
  this.addLinks = function(links) {
    for (var i = 0; i < links.length; i++) {
      this.addLink(links[i]);
    }
  };
  this.addLink = function(link) {
    this._links.push(link);
  };
  this.addLinksAtFront = function(links) {
    for (var i = 0; i < links.length; i++) {
      this.addLinkAtFront(links[i]);
    }
  };
  this.addLinkAtFront = function(link) {
    this._links.unshift(link);
  };
  this.refreshLinks = function() {
    var head = this.getHead();
    var links = this.getLinks();
    for (var i = 0; i < links.length; i++) {
      var link = document.createElement('link');
      for (const [name, val] of Object.entries(links[i])) {
        link[name] = val;
      }
      console.log('adding link', link);
      head.appendChild(link);
    }
  };

  // BODY FILE

  this.getBodyFilePath = function() {
    return this._bodyFilePath;
  };
  this.setBodyFilePath = function(filePath) {
    this._bodyFilePath = filePath;
  };

  // BODY ATTRIBUTES

  this.getBodyAttributes = function() {
    return this._bodyAttributes;
  };
  this.setBodyAttributes = function(attributes) {
    this._bodyAttributes = attributes;
  };
  this.hasBodyAttributes = function() {
    return !!this.getBodyAttributes();
  };
  this.refreshBodyAttributes = function() {
    var attributes = this.getBodyAttributes();
    if (attributes) {
      var body = this.getBody();
      for (const [name, val] of Object.entries(attributes)) {
        console.log('setting body attribute', name, val);
        body.setAttribute(name, val);
      }
    }
  };

  // REGIONS
  this.refreshRegions = function() {
    var body = this.getBody();
    var regions = app.getCurrentTheme().getRegions();
    for (const [name, region] of Object.entries(regions)) {
      var path = region.file.replace("regions/site", "regions/app");
      var url = app.getBaseUrl() + '/' + path;
      var req = new XMLHttpRequest();
      req.open('get', url);
      req.setRequestHeader('Content-type', 'text/html');
      req.onload = function() {
        if (this.status === 200) {
          var div = document.createElement("div");
          div.innerHTML = this.responseText;
          body.appendChild(div);
        }
        else { console.log(new Error(result.error.code + ' - ' + result.error.msg)); }
      };
      req.onerror = function() {
        console.log(req);
        error(new Error('xhr'));
      };
      req.send();
    }
  };

  // CONTENT TEMPLATE

  this.getContentTemplate = function() {
    return this._contentTemplate;
  };
  this.setContentTemplate = function(contentTemplate) {
    this._contentTemplate = contentTemplate;
  };

  // BOTTOM SCRIPTS

  this.getBottomScripts = function() {
    return this._bottomScripts;
  };
  this.setBottomScripts = function(scripts) {
    this._bottomScripts = scripts;
  };
  this.addBottomScripts = function(scripts) {
    for (var i = 0; i < scripts.length; i++) {
      this.addBottomScript(scripts[i]);
    }
  };
  this.addBottomScript = function(script) {
    this._bottomScripts.push(script);
  };
  this.addJsToBottom = function(script) {
    this.addBottomScript(script);
  };
  this.refreshBottomScripts = function() {
    var body = this.getBody();
    var scripts = this.getBottomScripts();
    for (var i = 0; i < scripts.length; i++) {
      var script = document.createElement('script');
      for (const [name, val] of Object.entries(scripts[i])) {
        script[name] = val;
      }
      console.log('adding bottom script', script);
      body.appendChild(script);
    }
  };

  // CONTROLLER

  this.getController = function() {
    return this._controller;
  };
  this.setController = function(controller) {
    this._controller = controller;
  };
  this.hasController = function() {
    return !!this._controller;
  };

  this.getControllerFile = function() {
    return this.hasControllerFile() ?
      this.getController().file :
      null;
  };
  this.setControllerFile = function(file) {
    this._controller.file = file;
  };
  this.hasControllerFile = function() {
    return !!this.getController().file;
  };

  this.getControllerLoad = function() {
    return this.hasControllerLoad() ?
      this.getController().load :
      null;
  };
  this.setControllerLoad = function(load) {
    this._controller.load = load;
  };
  this.hasControllerLoad = function() {
    return !!this.getController().load;
  };

  this.getControllerPreProcess = function() {
    return this.hasControllerPreProcess() ?
      this.getController().preProcess :
      null;
  };
  this.setControllerPreProcess = function(preProcess) {
    this._controller.preProcess = preProcess;
  };
  this.hasControllerPreProcess = function() {
    return !!this.getController().preProcess;
  };

  this.getControllerData = function() {
    return this.hasControllerData() ?
      this.getController().data :
      null;
  };
  this.setControllerData = function(data) {
    this._controller.data = data;
  };
  this.hasControllerData = function() {
    return !!this.getController().data;
  };

};
