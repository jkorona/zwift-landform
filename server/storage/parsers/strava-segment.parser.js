const assert = require('assert');

module.exports = function (segment) {
  assert.ok(segment);
  assert.equal(segment.length, 2);

  
  const [firstSerie, secondSerie] = segment;
  return firstSerie.data.map((item, index) => ({
    [firstSerie.type]: item,
    [secondSerie.type]: secondSerie.data[index]
  }));
};