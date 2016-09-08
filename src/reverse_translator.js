function ReverseTranslator(dictionary) {
  if (typeof dictionary !== 'object') {
    return new Error('The dialect or lanaguage parameter was not an object');
  }
  if (Object.keys(dictionary).length < 1) {
    return new Error('The dialect or language object provided is empty')
  }

  var errorProneProp;
  var typeTest = Object.keys(dictionary).some(function(item) {
      errorProneProp = item;
      return typeof dictionary[item] !== 'string' && typeof dictionary[item] !== 'object';
  })

  if (typeTest) {
    return new Error('Unsupported data type supplied for ' + errorProneProp + ' property');
  }

  var arrayTest = Object.keys(dictionary).some(function(item) {
    errorProneProp = item;
    return dictionary[item].length === undefined;
  });

  if (arrayTest) {
    return new Error('object supplied for ' + errorProneProp + ' instead of array');
  }

  var reversedDictionary = {}
  Object.keys(dictionary).map(function(item) {
    if (typeof dictionary[item] === 'string') {
      if (!reversedDictionary[dictionary[item]]) {
        reversedDictionary[dictionary[item]] = item;
      } else if (typeof reversedDictionary[dictionary[item]] === 'object') {
        reversedDictionary[dictionary[item]].push(item);
      } else if (typeof reversedDictionary[dictionary[item]] === 'string') {
        reversedDictionary[dictionary[item]] = [reversedDictionary[dictionary[item]], item]
      }
    } else if (typeof dictionary[item] === 'object') {
      dictionary[item].map(function(value, index) {
        if (!reversedDictionary[dictionary[item][index]]) {
          reversedDictionary[dictionary[item][index]] = item;
        }
        else if (typeof reversedDictionary[dictionary[item][index]] === 'object') {
          reversedDictionary[dictionary[item][index]].push(item);
        }
        else if (typeof reversedDictionary[dictionary[item][index]] === 'string') {
          reversedDictionary[dictionary[item][index]] = [reversedDictionary[dictionary[item][index]], item]
        }
      })
    }

  });

  return reversedDictionary;
}



module.exports = ReverseTranslator;



// Object.keys(words).map(function(word) {
//   var matchWord = new RegExp('\\b' + word + '\\b', "g");
//   if ( matchWord.test(message) ) {
//     if ( typeof words[word] === 'object' ) {
//       var choice = Math.floor(Math.random() * words[word].length);
//       message = message.replace(matchWord, words[word][choice]);
//     } else {
//       message = message.replace(matchWord, words[word]);
//     }
//   }
// });
