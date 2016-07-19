var Engine = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine');
var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');
var EngineQuery = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine_query');
var Filter = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/filter');
var _ = require('underscore');

var test_definitions = {
  "dialect": "mysql",
  "tables": {
    "orders": {
      "name": "orders",
      "columns": ["created_at", "id", "customer_id", "revenue"]
    },
    "customers": {
      "name": "customers",
      "columns": ["id", "created_at", "email"]
    }
  },
  "joins": [
    {
      "id": 1,
      "foreign_key_table": "orders",
      "foreign_key": "customer_id",
      "primary_key_table": "customers",
      "primary_key": "id",
      "join_type": "join"
    },
    {
      "id": 2,
      "foreign_key_table": "customers",
      "foreign_key": "id",
      "primary_key_table": "orders",
      "primary_key": "customer_id",
      "join_type": "join"
    }
  ]
}

describe("engine_render", function () {
  var engine = new Engine();
  engine.load_definitions(test_definitions);
  var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
  var sum_revenue_content = Element.populate("content", {
    "id": 1,
    "generated": false,
    "table": "orders",
    "type": "content",
    "description": "sum of orders revenue",
    "name": "orders.sum revenue",
    "sql_func": "sum",
    "sql_code": "revenue"
  }, 1);

  it("renders an empty query with nothing", function () {
    var result = engine.render_query();
    expect(result).toEqual("Empty Query");
  })

  it("renders something when you add a table", function () {
    engine.select_table("orders");
    var result = engine.render_query();
    expect(result).toEqual("SELECT  FROM `orders` LIMIT 100");
  });

  it("adds a column", function () {
    engine.select_table("orders");
    var created_at_column_element = Element.autogenerate_with_column("orders", "created_at", 0);

    engine.query.columns.push(created_at_column_element);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`created_at` AS `orders.created_at` FROM `orders` GROUP BY `orders`.`created_at` LIMIT 100");
  });

  it("adds two columns", function () {
    engine.select_table("orders");
    var created_at_column_element = Element.autogenerate_with_column("orders", "created_at", 0);
    var id_column_element = Element.autogenerate_with_column("orders", "id", 1);

    engine.query.columns.push(created_at_column_element);
    engine.query.columns.push(id_column_element);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`created_at` AS `orders.created_at`, `orders`.`id` AS `orders.id` FROM `orders` GROUP BY `orders`.`created_at`, `orders`.`id` LIMIT 100");
  });

  it("adds an allowed join", function () {
    engine.select_table("orders");
    var customers_id_column = Element.autogenerate_with_column("customers", "id", 0);

    engine.query.columns.push(customers_id_column);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `customers`.`id` AS `customers.id` FROM `orders` INNER JOIN `customers` ON (`orders`.`customer_id` = `customers`.`id`) GROUP BY `customers`.`id` LIMIT 100");
  });

  it("adds a valued unjoined filter and a column element", function () {
    engine.select_table("orders");
    var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
    var revenue_filter = new Filter(revenue_column_element, {
      method: "Greater Than",
      value: "95"
    });

    engine.query.columns.push(revenue_column_element);
    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`revenue` AS `orders.revenue` FROM `orders` WHERE (orders.revenue > 95) GROUP BY `orders`.`revenue` LIMIT 100");
  });

});
