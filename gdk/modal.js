// TITLE

bootstrap.Modal.prototype.getTitleElement = function() {
  return this._element.querySelector('.modal-title');
};
bootstrap.Modal.prototype.setTitle = function(html) {
  this.getTitleElement().innerHTML = html;
};

// BODY

bootstrap.Modal.prototype.getBodyElement = function() {
  return this._element.querySelector('.modal-body');
};
bootstrap.Modal.prototype.setBody = function(html) {
  this.getBodyElement().innerHTML = html;
};

// FOOTER

bootstrap.Modal.prototype.getFooterElement = function() {
  return this._element.querySelector('.modal-footer');
};
bootstrap.Modal.prototype.setFooter = function(html) {
  this.getFooterElement().innerHTML = html;
};
bootstrap.Modal.prototype.showFooter = function() {
  this.getFooterElement().classList.remove('d-none');
};
bootstrap.Modal.prototype.hideFooter = function() {
  this.getFooterElement().classList.add('d-none');
};
