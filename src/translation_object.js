 function Translation(message, words, phrases) {
  this.message = message;
  this.translation = message;
  this.translations = [];
  this.word_count = message.split(' ').length;
  this.percentage = function() {
    let translations = this.translations.reduce((n, t) => {
      n += t.translation.split(' ').length
      return n;
    }, 0);
    if (translations >= this.word_count) {
      return 100;
    }
    return 100 - (((this.word_count - translations) / this.word_count) * 100);
  };
  this.words = words;
  this.phrases = phrases;
};

module.exports = Translation;
