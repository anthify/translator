var expect = require('chai').expect;
var PhraseTranslator = require('../src/phrase_translator.js');
var Phrases = {
  'of course' : [{translation: 'wey aye', meta: '...'}],
  'no problem' : [{translation: 'ne botha', meta: '...'}],
  'how are you doing' : [{translation: 'ya areet, wor kid', meta: '...'}],
  'come on' : [{translation: 'howay', meta: '...'}],
  'with us' : [{translation: 'with wer', meta: '...'}],
  'good bye' : [{translation: 'tra now', meta: '...'},{translation: 'ta ta', meta: '...'}],
};

function translationObj(message) {
  this.message = message,
  this.translation = message,
  this.translations = [],
  this.word_count = message.split(' ').length,
  this.percentage = 0
};

describe('PhraseTranslator', function() {

  it('return error if no message', function() {
    var subject = PhraseTranslator;
    expect(subject()).to.be.an('error');
  })

  it('return error if no phrases are provided', function() {
    var subject = PhraseTranslator;
    expect(subject()).to.be.an('error');
  })

  it('should return a string', function() {
    var subject = PhraseTranslator(new translationObj('of course'), Phrases);
    expect(subject.translation).to.be.a('string');
    expect(subject.translation).to.equal('w~e~y~ ~a~y~e');
  });

  it('should return a string when array item matches', function() {
    var subject = PhraseTranslator(new translationObj('no problem'), Phrases);
    expect(subject.translation).to.be.a('string');
  });

  it('should return a string with tilde symbols obscuring the message', function() {
    var subject = PhraseTranslator(new translationObj('no problem'), Phrases);
    expect(subject.translation.indexOf('~')).to.equal(1);
  });

  it('should translate multiple instances of phrase', function() {
    var trans = new translationObj('hello, how are you doing? sir come on with us.')
    var subject = PhraseTranslator(trans, Phrases)
    expect(subject.translation).to.equal('hello, y~a~ ~a~r~e~e~t~,~ ~w~o~r~ ~k~i~d? sir h~o~w~a~y w~i~t~h~ ~w~e~r.');
  });

  it('should return one of the possible phrase translations', function() {
    var subject = PhraseTranslator(new translationObj('good bye'), Phrases);
    expect(subject.translation).to.be.oneOf([
      't~r~a~ ~n~o~w',
      't~a~ ~t~a'
    ])
  });
});
