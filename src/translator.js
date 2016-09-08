var WordTranslator = require('./word_translator.js');
var PhraseTranslator = require('./phrase_translator.js');
var CleanTranslation = require('./clean_translation.js');
var ReverseTranslation = require('./reverse_translator.js');

var Translator = function(message, words, phrases, reverse) {
if ( typeof message !== 'string' ) {
  return new Error({message: 'Nothing to translate'});
}

if (typeof words !== 'object') {
  return new Error({message: 'No language or dialect for words specified'})
}

if (typeof phrases !== 'object') {
  return new Error({message: 'No language or dialect for phrases specified'})
}

if (reverse) {
  phrases = ReverseTranslation(phrases);
  words = ReverseTranslation(words);
}

message = message.toLowerCase();
message = PhraseTranslator(message, phrases);
message = WordTranslator(message, words);
message = CleanTranslation(message);

return message;

};

module.exports = Translator;
