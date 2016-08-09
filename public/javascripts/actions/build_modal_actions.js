var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    React = require('react'),
    Firebase = require('firebase');

var createInitialModalState = function () {
  return {
    openModal: false,
    modalContent: 'Close Modal',
    modalContentType: 'Announcement'
  }
};

module.exports = createInitialModalState;
