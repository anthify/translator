function WordTranslator(message, words) {

  if ( typeof message !== 'string' ) {
    return new Error('Nothing to translate');
  }

  if ( typeof words !== 'object' ) {
    return new Error('No language or dialect provided');
  }

  Object.keys(words).forEach(function(word) {
    var matchWord = new RegExp('\\b' + word + '\\b', "g");
    if ( matchWord.test(message) ) {
      if ( typeof words[word] === 'object' ) {
        var choice = Math.floor(Math.random() * words[word].length);
        message = message.replace(matchWord, words[word][choice]);
      } else {
        message = message.replace(matchWord, words[word]);
      }
    }
  });

  return message;
}

module.exports = WordTranslator;
