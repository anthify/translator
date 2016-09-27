const prep = t => {
  t.translation = t.translation.toLowerCase();
  return t;
}

module.exports = prep;
