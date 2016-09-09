var expect = require('chai').expect;
var WordTranslator = require('../src/word_translator.js');
var Words = {'thanks' : 'ta', 'was' : 'wer'};

describe('WordTranslator', function() {
  it('return error if no message', function() {
    var subject = WordTranslator;
    expect(subject()).to.be.an('error');
  })

  it('return error if no words are provided', function() {
    var subject = WordTranslator;
    expect(subject()).to.be.an('error');
  })

  it('should return a string', function() {
    var subject = WordTranslator('of course', Words);
    expect(subject).to.be.a('string');
  });

  it('should return a string when array item matches', function() {
    var subject = WordTranslator('thanks', Words);
    expect(subject).to.be.a('string');
    expect(subject).to.equal('ta');
  });

  it('should translate only the whole word, and not parts', function() {
    var message = 'thanks, it was thanksgiving yesterday. we gave thanks?';
    var subject = WordTranslator(message, Words);
    expect(subject).to.equal('ta, it wer thanksgiving yesterday. we gave ta?');
  });

});
