function WordTranslator(translation, words) {
  if ( !translation ) {
    return new Error('No translation object provided');
  }

  if ( typeof translation.message !== 'string' ) {
    return new Error('Nothing to translate');
  }

  if ( typeof words !== 'object' ) {
    return new Error('No language or dialect provided');
  }

  Object.keys(words).forEach(function(word) {
    var matchWord = new RegExp('\\b' + word + '\\b', "g");
    if ( matchWord.test(translation.message) ) {
        var choice = Math.floor(Math.random() * words[word].length);
        translation.translation = translation.translation.replace(matchWord, words[word][choice].word);
        translation.translations.push(words[word][choice]);
    }
  });

  return translation;
}

module.exports = WordTranslator;
