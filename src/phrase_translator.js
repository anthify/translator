function PhraseTranslator(t) {
  if ( !t ) {
    return new Error('No translation object provided');
  }
  if ( typeof t.message !== 'string' ) {
    return new Error('No message provided');
  }
  if ( typeof t.phrases !== 'object' ) {
    return new Error('No phrases provided');
  }

  Object.keys(t.phrases).forEach(function(phrase) {
    var phraseMatch = new RegExp('\\b' + phrase + '\\b', "g");
    if (phraseMatch.test(t.message)) {
        var choice = Math.floor(Math.random() * t.phrases[phrase].length);
        t.translation = t.translation.replace(phraseMatch, t.phrases[phrase][choice].translation.split('').join('~'));
        t.translations.push(t.phrases[phrase][choice]);
    }
  });

  return t;
}

module.exports = PhraseTranslator;
