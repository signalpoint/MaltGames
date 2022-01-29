var maltkit = {};
var mk = maltkit;

mk.onload = function() {

  app = new mk.App();

  app.start().then(function() {

    // Started...

  }).catch(function(e) {

    // Error...

    console.log(e);

  }).finally(function() {

    // Next...

  });

};
