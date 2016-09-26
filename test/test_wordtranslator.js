const expect = require('chai').expect;
const WordTranslator = require('../src/word_translator.js');
// const Words = {'thanks' : 'ta', 'was' : 'wer'};

const Words = {
  'thanks' : [{word: 'ta', meta: 'some meta info'}],
  'bye' : [{word: 'laterz', meta: 'some meta info'}, {word: 'tra', meta: 'some meta info'}]
};

function translationObj(message) {
  this.message = message,
  this.translation = message,
  this.translations = [],
  this.word_count = message.split(' ').length,
  this.percentage = 0
};

describe('WordTranslator', () => {
  it('return error if no message', () => {
    const subject = WordTranslator;
    expect(subject()).to.be.an('error');
  })

  it('return error if no words are provided', () => {
    const subject = WordTranslator;
    expect(subject()).to.be.an('error');
  })

  it('should return correct translation', () => {
    const subject = WordTranslator(new translationObj('thanks'), Words);
    expect(subject.translation).to.equal('ta');
  })

  it('should return correct translation', () => {
    const subject = WordTranslator(new translationObj('bye'), Words);
    expect(subject.translation).to.be.oneOf(['laterz', 'tra']);
  })

  it('should return translations array', () => {
    const subject = WordTranslator(new translationObj('thanks'), Words);
    expect(subject.translations[0]).to.equal(Words['thanks'][0]);
  });

});
