var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  console.log(req);
  res.send('respond with a resource');
});

router.get('/user/:id', function(req, res) {
  // get the user?
  console.log(req);
  res.send('respond with a resource');
});

router.get('/user/:id/definitions', function(req, res) {
  // get the definitions for the user
  // var jsonDefinitions = require('../resources/test.json')
  console.log(req);
  res.send(jsonDefinitions);
  // res.send(req);
});

module.exports = router;
