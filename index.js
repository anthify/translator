const WordTranslator = require('./src/word_translator.js');
const PhraseTranslator = require('./src/phrase_translator.js');
const CleanTranslation = require('./src/clean_translation.js');
const ReverseTranslation = require('./src/reverse_translator.js');
const Translation = require('./src/translation_object.js');
const prep = require('./src/prep.js');
const pipe = require('./src/pipe.js');


const Translator = function(message, words, phrases, reverse) {
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

const translation = new Translation(message, words, phrases);

const translate = pipe(prep, PhraseTranslator, WordTranslator, CleanTranslation);
const result = translate(translation);
return result;

};

module.exports = Translator;
