var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');
var Definitions = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/definitions');


describe("definitions", function () {
  var testDefinitions;
  var testTables = require('/Users/jonathanyu/Desktop/scoutspot-core/resources/test.json');

  it("ignores dialects other than what is provided", function () {
    testDefinitions = Definitions.populate({
      "dialect": "mongo"
    })
    expect(testDefinitions.dialect).not.toBe("mongo");
  });
});
