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

describe("engine_render_contents", function () {
  var engine = new Engine();
  engine.load_definitions(test_definitions);
  var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);

  it("adds a sum type content", function () {
    engine.select_table("orders");
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
    engine.query.contents.push(sum_revenue_content);
    var result = engine.render_query();
    expect(result).toEqual("SELECT SUM(`orders`.`revenue`) AS `orders.sum revenue` FROM `orders` LIMIT 100");
  })

  it("adds a average type content", function () {
    engine.select_table("orders");
    var avg_revenue_content = Element.populate("content", {
      "id": 1,
      "generated": false,
      "table": "orders",
      "type": "content",
      "description": "average of orders revenue",
      "name": "orders.avg revenue",
      "sql_func": "avg",
      "sql_code": "revenue"
    }, 1);
    engine.query.contents.push(avg_revenue_content);
    var result = engine.render_query();
    expect(result).toEqual("SELECT AVG(`orders`.`revenue`) AS `orders.avg revenue` FROM `orders` LIMIT 100");
  })

  it("adds a max type content", function () {
    engine.select_table("orders");
    var max_revenue_content = Element.populate("content", {
      "id": 1,
      "generated": false,
      "table": "orders",
      "type": "content",
      "description": "max of orders revenue",
      "name": "orders.max",
      "sql_func": "max",
      "sql_code": "revenue"
    }, 1);
    engine.query.contents.push(max_revenue_content);
    var result = engine.render_query();
    expect(result).toEqual("SELECT MAX(`orders`.`revenue`) AS `orders.max` FROM `orders` LIMIT 100");
  })

  it("adds a min type content", function () {
    engine.select_table("orders");
    var min_revenue_content = Element.populate("content", {
      "id": 1,
      "generated": false,
      "table": "orders",
      "type": "content",
      "description": "minimum of orders revenue",
      "name": "orders.min revenue",
      "sql_func": "min",
      "sql_code": "revenue"
    }, 1);
    engine.query.contents.push(min_revenue_content);
    var result = engine.render_query();
    expect(result).toEqual("SELECT MIN(`orders`.`revenue`) AS `orders.min revenue` FROM `orders` LIMIT 100");
  })

});
