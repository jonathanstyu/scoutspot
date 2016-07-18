const express = require("express");
const router = express.Router();

import { renderToString } from "react-dom/server";
import App from "../public/javascripts/components/app";
import React from "react";

/* GET home page. */
router.get("/", function(req, res) {
  var jsonDefinitions = require('../resources/test.json')

  res.render("index", {
    title: 'ScoutSpot',
    definitions: JSON.stringify(jsonDefinitions)
  });
});

module.exports = router;
