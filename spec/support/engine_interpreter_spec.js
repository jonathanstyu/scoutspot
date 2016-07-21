var Engine = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine');
var Element = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/element');
var EngineQuery = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine_query');
var Filter = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/filter');
var EngineQueryInterpreter = require('/Users/jonathanyu/Desktop/scoutspot-core/public/javascripts/models/engine_query_interpreter');

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
  ],
  "elements": [
    {
      "id": 0,
      "generated": false,
      "table": "orders",
      "type": "content",
      "description": "Count of individual orders",
      "name": "orders.count",
      "sql_func": "count",
      "sql_code": "id"
    },
    {
      "id": 2,
      "generated": false,
      "table": "customers",
      "type": "content",
      "description": "Count of individual customers",
      "name": "customers.count",
      "sql_func": "count",
      "sql_code": "id"
    }
  ]
}

describe("engine_interpeter", function () {
  var engine = new Engine();
  engine.load_definitions(test_definitions);
  var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
  var customer_id_column = Element.autogenerate_with_column("orders", "customer_id", 0);

  it("inflates with 2 filters and a column", function () {
    var query_string = {
      columns: "orders.created_at",
      filters: "orders.customer_id|Equals|3434,orders.count||,",
      table: "orders"
    }
    EngineQueryInterpreter.open(query_string, engine);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`created_at` AS `orders.created_at` FROM `orders` WHERE (`orders`.`customer_id` = '3434') HAVING `orders`.`id` GROUP BY `orders`.`created_at` LIMIT 100");
  })


});
