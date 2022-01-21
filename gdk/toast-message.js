var ToastMessage = function(msg, options) {

  var el = game.get('#liveToast');

  this._msg = msg;
  this._type = 'primary';

  if (options) {

    if (options.type) { this._type = options.type; }

  }

  this._options = !!options ? options : null;
  this._element = el;
  this._toast = new bootstrap.Toast(el);

  el.querySelector('.toast-body').innerHTML = msg;
  var types = toastTypes();
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    var name = 'bg-' + type;
    if (el.classList.contains(name)) {
      el.classList.remove(name);
    }
  }
  el.classList.add('bg-' + this._type);

};

ToastMessage.prototype = {

  getToast: function() { return this._toast; },
  show: function() { this.getToast().show(); }

};

Game.prototype.toast = function(msg, type) {
  var toastMessage = new ToastMessage(msg, {
    type: type
  });
  this.setToast(toastMessage.getToast());
  toastMessage.show();
};

/**
 * @deprecated
 */
function toastMessage(msg, type) {
  game.toast(msg, type);
}

function toastTypes() {
  return [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'body',
    'muted',
    'white',
    'black-50',
    'white-50'
  ];
}