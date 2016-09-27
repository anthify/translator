var CleanTranslation = function(t) {
  t.translation = t.translation.trim();
  var tildeMatch = new RegExp('~', 'g');
  if ( tildeMatch.test(t.translation) ) {
    t.translation = t.translation.replace(tildeMatch, '');
  }

  return t;
}

module.exports = CleanTranslation;
