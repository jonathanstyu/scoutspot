var express = require('express');
var router = express.Router();

require("node-jsx").install({
    harmony: true, 
    extension: ".jsx"
});

// var React = require("react"),
//     App = React.createFactory(require("../public/javascripts/components/app"));

/* GET home page. */
router.get('/', function(req, res) {
  var markup = "HEllo"

  res.render('index', { 
    title: 'ScoutSpot',
    markup: markup 
  });
});

module.exports = router;
