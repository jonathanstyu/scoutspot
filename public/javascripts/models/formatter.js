var _ = require('underscore'); 

var Formatter = function () {
  this.settings = {}; 
}

Formatter.prototype.format = function (unformatted_query) {
  var formatted = ""
  _.each(unformatted_query.split(" "), function (string) {
    if (string != 'FROM' || string != 'WHERE' || string != 'GROUP') {
      formatted = formatted + " " + '\n' + string; 
    } else {
      formatted = formatted + " " + string; 
    }
  });
  return formatted; 
}

module.exports = Formatter; 