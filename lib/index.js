'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTextEditor = exports.EditorValue = exports.createValueFromString = exports.createEmptyValue = exports.decorator = undefined;

var _draftJs = require('draft-js');

var _EditorValue2 = require('./lib/EditorValue');

var _EditorValue3 = _interopRequireDefault(_EditorValue2);

var _LinkDecorator = require('./lib/LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _RichTextEditor2 = require('./RichTextEditor');

var _RichTextEditor3 = _interopRequireDefault(_RichTextEditor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decorator = exports.decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default]);

var createEmptyValue = exports.createEmptyValue = function createEmptyValue() {
  return _EditorValue3.default.createEmpty(decorator);
};

var createValueFromString = exports.createValueFromString = function createValueFromString(markup, format) {
  return _EditorValue3.default.createFromString(markup, format, decorator);
};

exports.EditorValue = _EditorValue3.default;
exports.RichTextEditor = _RichTextEditor3.default;