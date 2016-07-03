var express = require('express');
var router = express.Router();

// require("node-jsx").install({
//     harmony: true,
//     extension: ".jsx"
// });
// var React = require("react"),
//     App = React.createFactory(require("../public/javascripts/components/app"));


// Load the definitions from table 


/* GET home page. */
router.get('/', function(req, res) {
  var jsonDefinitions = require('../resources/test.json')
  
  res.render('index', { 
    title: 'ScoutSpot',
    definitions: JSON.stringify(jsonDefinitions),
    partials: {header: 'header'}
  });
});

module.exports = router;
