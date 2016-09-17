function PhraseTranslator(message, phrases) {
  if ( typeof message !== 'string' ) {
    return new Error('No message provided');
  }

  if ( typeof phrases !== 'object' ) {
    return new Error('No phrases provided');
  }

  Object.keys(phrases).forEach(function(phrase) {
    var phraseMatch = new RegExp('\\b' + phrase + '\\b', "g");
    if (phraseMatch.test(message)) {
      if (typeof phrases[phrase] === 'object') {
        var choice = Math.floor(Math.random() * phrases[phrase].length);
        message = message.replace(phraseMatch, phrases[phrase][choice].split('').join('~'));
      } else {
        message = message.replace(phraseMatch, phrases[phrase].split('').join('~'));
      }
    }
  });
  return message;
}

module.exports = PhraseTranslator;
