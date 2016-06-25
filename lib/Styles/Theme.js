'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Colors = require('./Colors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function Theme() {
  var shade = arguments.length <= 0 || arguments[0] === undefined ? 'light' : arguments[0];

  _classCallCheck(this, Theme);

  this.toolbar = {};
  this.iconButton = {};
  this.buttonGroup = {};

  this.theme = _Colors.theme[shade];
  this.text = _Colors.text[shade === 'light' ? 'dark' : 'light'];
};

exports.default = Theme;