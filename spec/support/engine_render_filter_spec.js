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

describe("engine_render_filter", function () {
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

  it("adds an method unjoined filter", function () {
    engine.select_table("orders");
    var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
    var revenue_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: "45"
    })

    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` WHERE (`orders`.`revenue` > '45') LIMIT 100");
  });

  it("adds a null unjoined filter", function () {
    engine.select_table("orders");
    var column_element = Element.autogenerate_with_column("orders", "created_at", 0);
    var filter = Filter.build(column_element, {
      method: "Is Not Null"
    })

    engine.query.filters.push(filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` WHERE (`orders`.`created_at` IS NOT NULL) LIMIT 100");
  });

  it("adds a plain unjoined filter", function () {
    engine.select_table("orders");
    var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
    var revenue_filter = Filter.build(revenue_column_element, {
    });

    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` WHERE `orders`.`revenue` LIMIT 100");
  });

  it("adds a plain unjoined filter and a column element", function () {
    engine.select_table("orders");
    var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
    var revenue_filter = Filter.build(revenue_column_element, {
    });

    engine.query.columns.push(revenue_column_element);
    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`revenue` AS `orders.revenue` FROM `orders` WHERE `orders`.`revenue` GROUP BY `orders`.`revenue` LIMIT 100");
  });

  it("adds two column filters at the same time", function () {
    engine.select_table("orders");
    var revenue_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: 95
    });
    var id_column_element = Element.autogenerate_with_column("orders", "id", 0);
    var id_filter = Filter.build(id_column_element, {
      method: "Equals",
      value: 'abc'
    })

    engine.query.filters.push(revenue_filter);
    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` WHERE ((`orders`.`revenue` > 95) AND (`orders`.`revenue` > 95)) LIMIT 100");
  })

  it("adds one complete column filter and 1 incomplete column filter", function () {
    engine.select_table("orders");
    var revenue_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: 95
    });
    var id_column_element = Element.autogenerate_with_column("orders", "id", 0);
    var id_filter = Filter.build(id_column_element, {
    })

    engine.query.filters.push(revenue_filter);
    engine.query.filters.push(id_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` WHERE ((`orders`.`revenue` > 95) AND `orders`.`id`) LIMIT 100");
  })

  it("adds a valued unjoined filter and a column element", function () {
    engine.select_table("orders");
    var revenue_column_element = Element.autogenerate_with_column("orders", "revenue", 0);
    var revenue_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: "95"
    });

    engine.query.columns.push(revenue_column_element);
    engine.query.filters.push(revenue_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.`revenue` AS `orders.revenue` FROM `orders` WHERE (`orders`.`revenue` > '95') GROUP BY `orders`.`revenue` LIMIT 100");
  });

  it("adds a content and column filter", function () {
    engine.select_table("orders");
    var column_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: "45"
    });

    var content = {
      "id": 2,
      "generated": false,
      "table": "customers",
      "type": "content",
      "description": "Count of individual customers",
      "name": "customers.count",
      "sql_func": "count",
      "sql_code": "id"
    }

    var content_filter = Filter.build(content, {
      method: "Equals",
      value: "45"
    });

    engine.query.filters.push(content_filter);
    engine.query.filters.push(column_filter);
    var result = engine.render_query();
    expect(result).toEqual("SELECT `orders`.* FROM `orders` INNER JOIN `customers` ON (`orders`.`customer_id` = `customers`.`id`) WHERE (`orders`.`revenue` > '45') HAVING (COUNT(`customers`.`id`) = '45') LIMIT 100");
  });

  it("edits a content filter value", function () {
    engine.select_table("orders");
    var column_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: "45",
      id: 1
    });

    var content = {
      "id": 2,
      "generated": false,
      "table": "customers",
      "type": "content",
      "description": "Count of individual customers",
      "name": "customers.count",
      "sql_func": "count",
      "sql_code": "id"
    }

    var content_filter = Filter.build(content, {
      id: 2,
      method: "Equals",
      value: "45"
    });
    engine.query.filters.push(content_filter);
    engine.query.filters.push(column_filter);

    engine.edit_filter({
      filter_id: 2,
      filter_value: 60
    })
    var result = engine.render_query()
    expect(result).toEqual("SELECT `orders`.* FROM `orders` INNER JOIN `customers` ON (`orders`.`customer_id` = `customers`.`id`) WHERE (`orders`.`revenue` > '45') HAVING (COUNT(`customers`.`id`) = '60') LIMIT 100");
  })

  it("edits a content filter method", function () {
    engine.select_table("orders");
    var column_filter = Filter.build(revenue_column_element, {
      method: "Greater Than",
      value: "45",
      id: 1
    });

    var content = {
      "id": 2,
      "generated": false,
      "table": "customers",
      "type": "content",
      "description": "Count of individual customers",
      "name": "customers.count",
      "sql_func": "count",
      "sql_code": "id"
    }

    var content_filter = Filter.build(content, {
      id: 2,
      method: "Equals",
      value: "45"
    });
    engine.query.filters.push(content_filter);
    engine.query.filters.push(column_filter);

    engine.edit_filter({
      filter_id: 2,
      filter_method: 'Greater Than'
    })
    var result = engine.render_query()
    expect(result).toEqual("SELECT `orders`.* FROM `orders` INNER JOIN `customers` ON (`orders`.`customer_id` = `customers`.`id`) WHERE (`orders`.`revenue` > '45') HAVING (COUNT(`customers`.`id`) > '45') LIMIT 100");
  })

  it("edits a content filter method and a joined column", function () {
    engine.select_table("orders");
    var customer_id_column_element = Element.autogenerate_with_column("customers", "email", 0);
    var column_filter = Filter.build(customer_id_column_element, {
      method: "Equals",
      value: "1asdf23",
      id: 1
    });

    var content = {
      "id": 2,
      "generated": false,
      "table": "customers",
      "type": "content",
      "description": "Count of individual customers",
      "name": "customers.count",
      "sql_func": "count",
      "sql_code": "id"
    }

    var content_filter = Filter.build(content, {
      id: 2,
      method: "Equals",
      value: "45"
    });
    engine.query.filters.push(content_filter);
    engine.query.filters.push(column_filter);

    engine.edit_filter({
      filter_id: 1,
      filter_value: '3343434'
    })
    var result = engine.render_query()
    expect(result).toEqual("SELECT `orders`.* FROM `orders` INNER JOIN `customers` ON (`orders`.`customer_id` = `customers`.`id`) WHERE (`customers`.`email` = '3343434') HAVING (COUNT(`customers`.`id`) = '45') LIMIT 100");
  })

});
