var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');

describe("element", function () {
  var testElement = new Element();
  var newElement = Element.autogenerate_with_column("orders", "id", 1);

  it("properly creates itself with a blank", function () {
    expect(testElement.id).toEqual("");
  });

// Testing autogenerates
  it("properly auto generates the name field", function () {
    expect(newElement.name).toEqual("orders.id");
  });

  it("properly auto generates the sql_func field", function () {
    expect(newElement.sql_func).toEqual("field");
  });
});
