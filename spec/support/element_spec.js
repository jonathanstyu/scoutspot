var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');

describe("element", function () {
  var testElement = new Element();
  var newElement = Element.autogenerate_with_column("orders", "id", 1);
  var customElementSpec = {
    "id": 0,
    "generated": false,
    "table": "orders",
    "type": "content",
    "description": "Count of individual orders",
    "name": "orders.count",
    "sql_func": "count",
    "sql_code": "id"
  }
  var customElement = Element.populate('content', customElementSpec, 1)

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

// creates with guidance
  it("properly creates a content element id with guidance", function () {
    expect(customElement.id).toEqual(1);
  })

  it("properly creates a content element table with guidance", function () {
    expect(customElement.table).toEqual("orders");
  })

  it("properly creates a content element type with guidance", function () {
    expect(customElement.type).toEqual("content");
  })

  it("properly creates a content element sql_code with guidance", function () {
    expect(customElement.sql_code).toEqual("id");
  })

  it("properly creates a content element sql_func with guidance", function () {
    expect(customElement.sql_func).toEqual("count");
  })
});
