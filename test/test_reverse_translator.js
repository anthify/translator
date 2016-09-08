var expect = require('chai').expect;
var ReverseTranslator = require('../src/reverse_translator.js');
var Words = require('../src/dialects/geordie/words.js');
var Phrases = require('../src/dialects/geordie/phrases.js');

describe('ReverseTranslator', function() {
  it('return an object', function() {
    var subject = ReverseTranslator;
    expect(subject({'hello' : 'areet'})).to.be.an('object');
  });

  it('return error if object is empty', function() {
    var subject = ReverseTranslator;
    expect(subject({})).to.be.an('error');
  });

  it('return error if not object', function() {
    var subject = ReverseTranslator;
    expect(subject('hiya')).to.be.an('error');
  });


  it('return error if object contains a non-string or non-array value type', function() {
    var subject = ReverseTranslator;
    var errorProneObject = {
      name  : 1
    };
    expect(subject(errorProneObject)).to.be.an('error');
    errorProneObject = {
      newProp  : function() {}
    };
    expect(subject(errorProneObject)).to.be.an('error');
  });

  it('return error if property stores an object instead of an array', function() {
    var subject = ReverseTranslator;
    var errorProneObject = {
      'testing' : {'another': 'object'}
    };
    var result = subject(errorProneObject);
    expect(result).to.be.an('error');
  });

  it('should return reversed object for string key value pair', function() {

    var subject = ReverseTranslator;
    var someWords = {
      'hello' : 'areet',
      'yes' : 'aye',
      'bye' : 'tra'
    };

    var someWordsReversed = {
      'areet' : 'hello',
      'aye' : 'yes',
      'tra' : 'bye'
    };

    var result = subject(someWords);

    expect(result.aye).to.equal('yes');
    expect(result.tra).to.equal('bye');
    expect(result.areet).to.equal('hello');

  });

  it('should return reversed object for array values', function() {
    var subject = ReverseTranslator;
    var someWords = {
      'hello' : ['areet', 'alreet', 'how'],
      'alright' : 'areet',
      'bye' : 'tra',
      'laters' : 'tra',
      'seeya' : 'tra'
    };

    var someWordsReversed = {
      'areet' : ['hello', 'alright'],
      'alreet' : 'hello',
      'how' : 'hello',
      'tra' : 'bye',
    }

    var result = subject(someWords);
    expect(result["areet"][0]).to.equal(someWordsReversed.areet[0])
    expect(result["areet"][1]).to.equal(someWordsReversed.areet[1])
    expect(result["alreet"]).to.equal('hello');
    expect(result["how"]).to.equal('hello');
    expect(result["tra"][0]).to.equal('bye');
    expect(result["tra"][1]).to.equal('laters');
    expect(result["tra"][2]).to.equal('seeya');
  });
})
