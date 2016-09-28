var expect = require('chai').expect;
var ReverseTranslator = require('../src/reverse_translator.js');

describe('ReverseTranslator', function() {
  it('return an object', function() {
    var subject = ReverseTranslator;
    let hello = {'hello' : [{translation: 'areet'}]}
    expect(subject(hello)).to.be.an('object');
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
      'hello' : [{translation: 'areet'}],
      'yes' : [{translation: 'aye'}],
      'bye' : [{translation: 'tra'}]
    };

    var someWordsReversed = {
      'areet' : [{translation: 'hello'}],
      'aye' : [{translation: 'yes'}],
      'tra' : [{translation: 'bye'}]
    };

    var result = subject(someWords);

    expect(result.aye[0].translation).to.equal('yes');
    expect(result.tra[0].translation).to.equal('bye');
    expect(result.areet[0].translation).to.equal('hello');

  });

  it('should return reversed object for array values', function() {
    var subject = ReverseTranslator;
    var someWords = {
      'hello' : [{translation: 'areet'}, {translation: 'alreet'}, {translation: 'how'}],
      'alright' : [{translation: 'areet'}],
      'bye' : [{translation: 'tra'}],
      'laters' : [{translation: 'tra'}],
      'seeya' : [{translation: 'tra'}]
    };

    var someWordsReversed = {
      'areet' : [{translation: 'hello'}, {translation: 'alright'}],
      'alreet' : [{translation: 'hello'}],
      'how' : [{translation: 'hello'}],
      'tra' : [{translation: 'bye'}],
    }

    var result = subject(someWords);
    expect(result["areet"][0].translation).to.equal(someWordsReversed.areet[0].translation)
    expect(result["areet"][1].translation).to.equal(someWordsReversed.areet[1].translation)
    expect(result["alreet"][0].translation).to.equal('hello');
    expect(result["how"][0].translation).to.equal('hello');
    expect(result["tra"][0].translation).to.equal('bye');
    expect(result["tra"][1].translation).to.equal('laters');
    expect(result["tra"][2].translation).to.equal('seeya');
  });
})
