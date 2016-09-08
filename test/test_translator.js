var expect = require('chai').expect;
var Translator = require('../src/translator.js');
var Words = require('../src/dialects/geordie/words.js');
var Phrases = require('../src/dialects/geordie/phrases.js');

describe('Translator', function() {
  it('return a string', function() {
    var subject = Translator;
    expect(subject('hello', {}, {})).to.be.a('string');
  });

  it('return error if no message', function() {
    var subject = Translator;
    expect(subject()).to.be.an('error');
  });

  it('return error if no words', function() {
    var subject = Translator;
    expect(subject('hello')).to.be.an('error');
  });

  it('return error if no phrases', function() {
    var subject = Translator;
    expect(subject('hello', {})).to.be.an('error');
  });

  it('should return string', function() {
    var message = 'hello, how are you doing? are you doing anything tonight?';
    var subject = Translator(message, Words, Phrases);
    expect(subject).to.be.a('string');
    console.log(subject);
    var subject = Translator(subject, Words, Phrases, true);
    console.log(subject);
    expect(subject).to.be.a('string');
  });

})
