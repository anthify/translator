function ReverseTranslator(dictionary) {
  if (typeof dictionary !== 'object') {
    return new Error('The dialect or lanaguage parameter was not an object');
  }
  if (Object.keys(dictionary).length < 1) {
    return new Error('The dialect or language object provided is empty')
  }

  var errorProneProp;
  var typeTest = Object.keys(dictionary).some(function(current) {
      errorProneProp = current;
      return typeof dictionary[current] !== 'string' && typeof dictionary[current] !== 'object';
  })

  if (typeTest) {
    return new Error('Unsupported data type supplied for ' + errorProneProp + ' property');
  }

  var arrayTest = Object.keys(dictionary).some(function(current) {
    errorProneProp = current;
    return dictionary[current].length === undefined;
  });

  if (arrayTest) {
    return new Error('object supplied for ' + errorProneProp + ' instead of array');
  }

  var reversedDictionary = Object.keys(dictionary).reduce(function(previous, current) {
    if (typeof dictionary[current] === 'string') {
      if (!previous[dictionary[current]]) {
        previous[dictionary[current]] = current;
      } else if (typeof previous[dictionary[current]] === 'object') {
        previous[dictionary[current]].push(current);
      } else if (typeof previous[dictionary[current]] === 'string') {
        previous[dictionary[current]] = [previous[dictionary[current]], current]
      }
    } else if (typeof dictionary[current] === 'object') {
      dictionary[current].forEach(function(value, index) {
        if (!previous[dictionary[current][index]]) {
          previous[dictionary[current][index]] = current;
        }
        else if (typeof previous[dictionary[current][index]] === 'object') {
          previous[dictionary[current][index]].push(current);
        }
        else if (typeof previous[dictionary[current][index]] === 'string') {
          previous[dictionary[current][index]] = [previous[dictionary[current][index]], current]
        }
      })
    }

    return previous;

  }, {});

  return reversedDictionary;
}

module.exports = ReverseTranslator;
