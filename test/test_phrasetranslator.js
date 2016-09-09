var expect = require('chai').expect;
var PhraseTranslator = require('../src/phrase_translator.js');
var Phrases = {
  'of course' : 'wey aye',
  'no problem' : 'ne botha',
  'how are you doing' : 'ya areet, wor kid',
  'come on' : 'howay',
  'with us' : 'with wer'
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
    var subject = PhraseTranslator('of course', Phrases);
    expect(subject).to.be.a('string');
    expect(subject).to.equal('w~e~y~ ~a~y~e');
  });

  it('should return a string when array item matches', function() {
    var subject = PhraseTranslator('no problem', Phrases);
    expect(subject).to.be.a('string');
  });

  it('should return a string with tilde symbols obscuring the message', function() {
    var subject = PhraseTranslator('no problem', Phrases);
    expect(subject.indexOf('~')).to.equal(1);
  });

  it('should translate multiple instances of phrase', function() {
    var message = 'hello, how are you doing? sir come on with us.'
    var subject = PhraseTranslator(message, Phrases)
    expect(subject).to.equal('hello, y~a~ ~a~r~e~e~t~,~ ~w~o~r~ ~k~i~d? sir h~o~w~a~y w~i~t~h~ ~w~e~r.');
  });

});
