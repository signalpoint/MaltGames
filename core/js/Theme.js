mk.Theme = function(id, theme) {

  this._id = id;
  this._regions = [];
  this._pageTemplates = [];
  this._contentTemplates = [];

  if (theme.regions) { this._regions = theme.regions; }
  if (theme.pageTemplates) { this._pageTemplates = theme.pageTemplates; }
  if (theme.contentTemplates) { this._contentTemplates = theme.contentTemplates; }

  // PROXIES

  this.id = function() {
    return this.getId();
  };

  // METHODS...

  this.getId = function() {
    return this._id;
  };

  // REGIONS

  this.getRegions = function() {
    return this._regions;
  };
  this.getRegion = function(id) {
    return this._regions[id] ? this._regions[id] : null;
  };

  // PAGE TEMPLATES

  this.getPageTemplates = function() {
    return this._pageTemplates;
  };
  this.addPageTemplates = function(pageTemplates) {
    for (const [id, pageTemplate] of Object(pageTemplates)) {
      this.addPageTemplate(id, pageTemplate);
    }
  };

  this.addPageTemplate = function(id, pageTemplate) {
    this._pageTemplates[id] = pageTemplate;
  };
  this.getPageTemplate = function(id) {
    return this._pageTemplates[id] ? this._pageTemplates[id] : null;
  };

  // CURRENT PAGE TEMPLATES

  this.getCurrentPageTemplate = function() {
    return this._currentPageTemplate;
  };
  this.setCurrentPageTemplate = function(pageTemplate) {
    this._currentPageTemplate = pageTemplate;
  };

  // CONTENT TEMPLATES

  this.getContentTemplates = function() { return this._contentTemplates; };
  this.addContentTemplates = function(contentTemplates) {
    for (const [id, contentTemplate] of Ojbect.entries(contentTemplates)) {
      this.addContentTemplate(id, contentTemplate);
    }
  };

  this.getContentTemplate = function(id) {
    return this._contentTemplates[id] ? this._contentTemplates[id] : null;
  };
  this.addContentTemplate = function(id, contentTemplate) {
    this._contentTemplates[id] = contentTemplate;
  };

};
