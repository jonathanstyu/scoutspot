var Immutable = require('immutable'),
    _ = require('underscore'),
    $ = require('jquery'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query');

var data = {
  "dialect": "mysql",
  "tables": {
    "orders": {
      "name": "orders",
      "columns": ["created_at", "id", "customer_id", "revenue"]
    },
    "customers": {
      "name": "customers",
      "columns": ["id", "created_at", "email"]
    },
    "order_items": {
      "name": "order_items",
      "columns": ["created_at", "id", "order_id", "revenue", "cost", "sale"]
    },
    "purchase_orders": {
      "name": "purchase_orders",
      "columns": ["id", "created_at", "vendor", "product_name"]
    },
    "companies" : {
      "name": "companies",
      "columns": ["company_id", "payroll_processed_at", "state", "industry", "is_active"]
    },
    "customer_care": {
      "name": "customer_care",
      "columns": ["company_id", "ticket_id", "created_at", "solved_at", "issue_type", "ticket_status"]
    }
  },
  "joins": [
    {
      "id": 0,
      "foreign_key_table": "order_items",
      "foreign_key": "order_id",
      "primary_key_table": "orders",
      "primary_key": "id",
      "join_type": "join"
    },
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
    },
    {
      "id": 3,
      "foreign_key_table": "companies",
      "foreign_key": "company_id",
      "primary_key_table": "customer_care",
      "primary_key": "company_id",
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
      "id": 1,
      "generated": false,
      "table": "orders",
      "type": "content",
      "description": "sum of orders revenue",
      "name": "orders.sum revenue",
      "sql_func": "sum",
      "sql_code": "revenue"
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
    },
    {
      "id": 3,
      "generated": false,
      "table": "customers",
      "type": "column",
      "description": "Customers email column",
      "name": "customers.email",
      "sql_func": "field",
      "sql_code": "email",
      "group_by": ""
    },
    {
      "id": 4,
      "generated": false,
      "table": "companies",
      "type": "content",
      "description": "Count of individual companies",
      "name": "companies.count",
      "sql_func": "count",
      "sql_code": "company_id"
    }
  ]
}

var createInitialState = function (definitions) {
  var emptyState = {};
  var definitions = data;
  // var definitions = JSON.parse(Object(data).replace(/&quot;/g,'"'));
  var engine = new Engine(definitions);
  emptyState.savedQueries = [
    new EngineQuery({
      table: "orders",
      columns: "orders.created_at"
    }),
    new EngineQuery({
      table: "customers",
      columns: "customers.id,customers.email"
    }),
    new EngineQuery({
      table: "orders",
      columns: "orders.created_at,orders.customer_id,customers.id",
      contents: 'customers.count'
    })
  ]
  emptyState.definitions = definitions;
  emptyState.available_tables = _.keys(definitions['tables']);
  emptyState.table_selected = false;
  emptyState.engine = engine;
  emptyState.available_elements = [];
  emptyState.joined_available_elements = [];

  emptyState.query_columns = engine.query.columns;
  emptyState.query_contents = engine.query.contents;
  emptyState.query_filters = engine.query.filters;
  return emptyState;
}

var generateFromEngineAction = function (state, action, option) {
  var newEngine = _.extend(state.engine, state.engine[action](option));
  var newQuery = Immutable.Map(newEngine.query)
  return _.assign({}, state, {
    table_selected: newQuery.get('table') === "" ? false : true,
    engine: newEngine,
    definitions: newEngine.definitions,
    joined_available_elements: newEngine.joined_available_elements,
    available_elements: newEngine.available_elements,
    query_columns: newQuery.get('columns'),
    query_contents: newQuery.get('contents'),
    query_filters: newQuery.get('filters')
  });
}

var spotApp = function (state, action) {
  if (typeof state === 'undefined') {
    return createInitialState()
  }
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case "RESET_QUERY":
      return createInitialState()
      break;

    case "SHARE_QUERY":
      console.log(state.engine.query.export());
      return state;

    case "SELECT_TABLE":
      var selectedTable = action.value;
      return generateFromEngineAction(state, "select_table", selectedTable)

    case "SELECT_ELEMENT":
      var selectedElement = action.value;
      return generateFromEngineAction(state, "add_element", selectedElement)

    case "SELECT_FILTER":
      var selectedFilter = action.value;
      return generateFromEngineAction(state, "add_filter", selectedFilter)

    case "REMOVE_ELEMENT":
      var selectedElement = action.value;
      return generateFromEngineAction(state, "remove_element", selectedElement)

    case "REMOVE_FILTER":
      var selectedFilter = action.value;
      return generateFromEngineAction(state, "remove_filter", selectedFilter)

    case "EDIT_FILTER_VALUE":
    return generateFromEngineAction(state, "edit_filter", {
      filter_id: action.id,
      filter_value: action.value
    });

    case "EDIT_FILTER_METHOD":
    return generateFromEngineAction(state, "edit_filter", {
      filter_id: action.id,
      filter_method: action.method
    });

    case "SET_ASC_VALUE":
      var selectedElementID = action.id

    default:

  }
  return state;
}

module.exports = spotApp;
