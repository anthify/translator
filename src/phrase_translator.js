function PhraseTranslator(translation, phrases) {
  if ( !translation ) {
    return new Error('No translation object provided');
  }
  if ( typeof translation.message !== 'string' ) {
    return new Error('No message provided');
  }

  if ( typeof phrases !== 'object' ) {
    return new Error('No phrases provided');
  }

  Object.keys(phrases).forEach(function(phrase) {
    var phraseMatch = new RegExp('\\b' + phrase + '\\b', "g");
    if (phraseMatch.test(translation.message)) {
        var choice = Math.floor(Math.random() * phrases[phrase].length);
        translation.translation = translation.translation.replace(phraseMatch, phrases[phrase][choice].translation.split('').join('~'));
        translation.translations.push(phrases[phrase][choice]);
    }
  });
  return translation;
}

module.exports = PhraseTranslator;
