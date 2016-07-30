var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.send('respond with a resource');
  next();
});

router.get('/:id', function(req, res, next) {
  // get the user?
  console.log(req);
  res.send('respond with a resource');
  next();
});

router.get('/:id/definitions', function(req, res) {
  // get the definitions for the user
  var jsonDefinitions = require('../resources/test.json')
  res.send(jsonDefinitions);
  // res.send(req);
});

module.exports = router;
