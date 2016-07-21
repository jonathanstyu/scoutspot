var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');
var Definitions = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/definitions');
var _ = require('underscore');

describe("definitions", function () {
  var testDefinitions;
  var testTables = require('/Users/jonathanyu/Desktop/scoutspot-core/resources/test.json');

  it("ignores dialects other than what is provided", function () {
    testDefinitions = Definitions.populate({
      "dialect": "mongo"
    })
    expect(testDefinitions.dialect).not.toBe("mongo");
  });

  it("creates the right number of elements", function () {
    testDefinitions = Definitions.populate(testTables);
    var elementsCount = testDefinitions.elements.length;

    var tableElementCount = _.reduce(testTables["tables"], function (memo, table) {
      return memo + table["columns"].length
    }, 0);
    var customElementCount = testTables["elements"].length
    expect(elementsCount).toEqual(tableElementCount + customElementCount);
  });
});
