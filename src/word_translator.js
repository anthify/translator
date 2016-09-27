function WordTranslator(t) {
  if ( !t ) {
    return new Error('No translation object provided');
  }
  if ( typeof t.message !== 'string' ) {
    return new Error('Nothing to translate');
  }
  if ( typeof t.words !== 'object' ) {
    return new Error('No language or dialect provided');
  }

  Object.keys(t.words).forEach(function(word) {
    var matchWord = new RegExp('\\b' + word + '\\b', "g");
    if ( matchWord.test(t.message) ) {
        var choice = Math.floor(Math.random() * t.words[word].length);
        t.translation = t.translation.replace(matchWord, t.words[word][choice].translation);
        t.translations.push(t.words[word][choice]);
    }
  });

  return t;
}

module.exports = WordTranslator;
