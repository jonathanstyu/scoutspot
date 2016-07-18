var Engine = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine');
var _ = require('underscore');

describe("engine", function () {
  var testTables = require('/Users/jonathanyu/Desktop/scoutspot-core/resources/test.json');
  var engine = new Engine();
  engine.load_definitions(testTables);

  it("returns an empty query when empty", function () {
    var query = engine.render_query();
    expect(query).toBe("Empty Query");
  });

  it("selects a table and provides available_elements", function () {
    engine.select_table("order_items");
    expect(engine.available_elements.length)
      .toEqual(testTables.tables.order_items.columns.length);
  })

  it("adds custom elements", function () {
    engine.select_table("customers");
    var custom_elements = _.where(testTables.elements, {"table": "customers"});
    expect(engine.available_elements.length)
      .toEqual(testTables.tables.customers.columns.length + custom_elements.length);
  });

});
