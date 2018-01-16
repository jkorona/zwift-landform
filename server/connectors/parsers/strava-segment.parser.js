const assert = require('assert');

module.exports = function (segment) {
  assert.ok(segment);
  assert.equal(segment.length, 3);

  
  const [firstSerie, secondSerie, thirdSerie] = segment;
  return firstSerie.data.map((item, index) => ({
    [firstSerie.type]: item,
    [secondSerie.type]: secondSerie.data[index],
    [thirdSerie.type]: thirdSerie.data[index]
  }));
};