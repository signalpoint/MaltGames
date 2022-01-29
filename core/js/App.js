mk.App = function() {

  var app = this;

  this._mods = {};
  this._themes = {};
  this._currentTheme = null;
  this._routes = {};
  this._currentRoute = null;
  this._pages = {};
  this._protocol = location.protocol;
  this._domain = location.host;
  this._baseUrl = this._protocol + '//' + this._domain;

  this.start = function() {

    return new Promise(function(ok, err) {

      // Connect to the Site...
      mk.apiGet('mk/connect').then(function(response) {

//        console.log(response);

        // Assemble the App from the Site connection.
        app.assemble(response);

        // THEME

        var theme = app.getCurrentTheme();
        console.log('theme', theme);

        // ROUTE
        var route = app.getRoute('mk.home');
        app.setCurrentRoute(route);

        // PAGE

        // Get the Page from the Route.
        var page = route.getPage();
//        console.log('page', page);

        // Get the Theme's default page template.
        var defaultPageTemplate = theme.getPageTemplate('default');
        console.log('defaultPageTemplate', defaultPageTemplate);

        // If the title was empty, use the default page title.
        if (page.getTitle() === '') {
          page.setTitle(defaultPageTemplate.head.title);
        }

        // <head> : meta, script, link
        // Add the scripts, metas and links from the default page's head to the
        // loaded page.
        var types = [
          'metas',
          'scripts',
          'links'
        ];
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          var items = defaultPageTemplate.head[type];
          if (items) {
            switch (type) {
              case 'metas':
                page.addMetaTagsAtFront(items);
                break;
              case 'scripts':
                page.addScriptsAtFront(items);
                break;
              case 'links':
                page.addLinksAtFront(items);
                break;
            }
          }
        }

        // <body> : script
        // Add the scripts from the default page's body to the loaded page.
        types = [
          'scripts'
        ];
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          var items = defaultPageTemplate.body[type];
          if (items) {
            switch (type) {
              case 'scripts':
                page.addBottomScripts(items);
                break;
            }
          }
        }

        console.log('page', page);

        // TODO: CONTROLLER

        // RENDER TIME...

        // TODO seems we're going to need to wait for these async ops to complete before moving to the next, right?

        //<head>

          // META TAGS
          page.refreshMetaTags();

          // TITLE

          // SCRIPTS
          page.refreshScripts();

          // LINKS
          page.refreshLinks();

        //</head>

        // <body>

          // BODY ATTRIBUTES
          page.refreshBodyAttributes();

          // REGIONS
          page.refreshRegions();

          // BOTTOM SCRIPTS
          page.refreshBottomScripts();

        // </body>

      }).catch(function(e) {

        console.log(e);

      });

    });

  };

  this.assemble = function(response) {

    if (response.mods) {
      this.initMods(response.mods);
    }

    if (response.themes) {
      this.addThemes(response.themes);
    }

    if (response.theme) {
      this.setCurrentTheme(this.getTheme(response.theme));
    }

    if (response.routes) {
      this.addRoutes(response.routes);
    }

  };

  // MODS
  this.getMods = function() { return this._mods; };
  this.addMods = function(mods) {
    for (const [id, mod] of Object.entries(mods)) {
      this.addMod(id, mod);
    }
  };
  this.addMod = function(id, mod) {
    this._mods[id] = new mk.Mod(id, mod);
  };
  this.getMod = function(id) {
    return !!this._mods[id] ? this._mods[id] : null;
  };
  this.loadMod = function(id) {
    this._mods[id].load();
  };
  this.initMods = function(mods) {

    // Add mods to app.
    this.addMods(mods);

    // For each initialized mod in the app...
    for (const [id, mod] of Object.entries(this.getMods())) {
      this.initMod(mod);
    }

  };
  this.initMod = function(mod) {

    // Load the mod.
    mod.load();

    // Add its routes to the Site.
//    var routes = mod.getRoutes();
//    if (routes) { this.addRoutes(routes); }

  };

  // THEMES
  this.getThemes = function() { return this._themes; };
  this.addThemes = function(themes) {
    for (const [id, theme] of Object.entries(themes)) {
      this.addTheme(id, theme);
    }
  };
  this.addTheme = function(id, theme) {
    this._themes[id] = new mk.Theme(id, theme);
  };
  this.getTheme = function(id) {
    return this._themes[id] ? this._themes[id] : null;
  };
  this.getCurrentTheme = function() {
    return this._currentTheme;
  };
  this.setCurrentTheme = function(theme) {
    this._currentTheme = theme;
  };

  // ROUTES
  this.getRoutes = function() { return this._routes; };
  this.addRoutes = function(routes) {
    for (const [id, route] of Object.entries(routes)) {
      this.addRoute(id, route);
    }
  };
  this.addRoute = function(id, route) {
    this._routes[id] = new mk.Route(id, route);
  };
  this.getRoute = function(id) {
    return this._routes[id] ? this._routes[id] : null;
  };
  this.getCurrentRoute = function() {
    return this._currentRoute;
  };
  this.setCurrentRoute = function(route) {
    this._currentRoute = route;
  };

  this.determineCurrentRoute = function() {
    // TODO implement!
  };

   // PAGES
  this.addPages = function(pages) {
    for (const [id, page] of Object.entries(pages)) {
      this.addPage(id, page);
    }
  };
  this.addPage = function(id, page) {
    this._pages[id] = new mk.Page(id, page);
  };

  this.loadPage = function(id) {
    return this._pages[id] ? this._pages[id] : null;
  };

  this.getProtocol = function() {
    return this._protocol;
  };

  this.getDomain = function() {
    return this._domain;
  };

  this.getBaseUrl = function() {
    return this._baseUrl;
  };

};
