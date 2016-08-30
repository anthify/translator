var CleanTranslation = function(message) {
  message = message.trim();
  var tildeMatch = new RegExp('~', 'g');
  if ( tildeMatch.test(message) ) {
    message = message.replace(tildeMatch, '');
  }

  return message;
}

module.exports = CleanTranslation;
