'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Icons;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonWrap = require('./ButtonWrap');

var _ButtonWrap2 = _interopRequireDefault(_ButtonWrap);

var _Bold = require('icons/Bold');

var _Bold2 = _interopRequireDefault(_Bold);

var _Italic = require('icons/Italic');

var _Italic2 = _interopRequireDefault(_Italic);

var _Strikethrough = require('icons/Strikethrough');

var _Strikethrough2 = _interopRequireDefault(_Strikethrough);

var _Code = require('icons/Code');

var _Code2 = _interopRequireDefault(_Code);

var _ListUl = require('icons/ListUl');

var _ListUl2 = _interopRequireDefault(_ListUl);

var _ListOl = require('icons/ListOl');

var _ListOl2 = _interopRequireDefault(_ListOl);

var _QuoteLeft = require('icons/QuoteLeft');

var _QuoteLeft2 = _interopRequireDefault(_QuoteLeft);

var _Link = require('icons/Link');

var _Link2 = _interopRequireDefault(_Link);

var _ChainBroken = require('icons/ChainBroken');

var _ChainBroken2 = _interopRequireDefault(_ChainBroken);

var _Undo = require('icons/Undo');

var _Undo2 = _interopRequireDefault(_Undo);

var _Repeat = require('icons/Repeat');

var _Repeat2 = _interopRequireDefault(_Repeat);

var _Check = require('icons/Check');

var _Check2 = _interopRequireDefault(_Check);

var _Times = require('icons/Times');

var _Times2 = _interopRequireDefault(_Times);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var css = {
  root: 'ort_f',
  active: 'ort_g'
};

var Icons = (_Icons = {
  bold: _Bold2.default,
  italic: _Italic2.default,
  strikethrough: _Strikethrough2.default
}, _defineProperty(_Icons, 'unordered-list-item', _ListUl2.default), _defineProperty(_Icons, 'ordered-list-item', _ListOl2.default), _defineProperty(_Icons, 'blockquote', _QuoteLeft2.default), _defineProperty(_Icons, 'link', _Link2.default), _defineProperty(_Icons, 'remove-link', _ChainBroken2.default), _defineProperty(_Icons, 'undo', _Undo2.default), _defineProperty(_Icons, 'redo', _Repeat2.default), _defineProperty(_Icons, 'code-block', _Code2.default), _defineProperty(_Icons, 'accept', _Check2.default), _defineProperty(_Icons, 'cancel', _Times2.default), _Icons);

var iconText = {
  code: '{}',
  unstyled: 'p',
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3'
};

var IconButton = function (_Component) {
  _inherits(IconButton, _Component);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconButton).apply(this, arguments));
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var iconName = _props.iconName;
      var label = _props.label;
      var children = _props.children;
      var active = _props.active;

      var otherProps = _objectWithoutProperties(_props, ['className', 'iconName', 'label', 'children', 'active']);

      var classes = (0, _classnames2.default)(className, css.root, _defineProperty({}, css.active, active));
      var Icon = Icons[iconName];
      return _react2.default.createElement(
        _ButtonWrap2.default,
        null,
        _react2.default.createElement(
          _Button2.default,
          _extends({}, otherProps, { title: label, className: classes }),
          Icon ? _react2.default.createElement(Icon, null) : iconText[iconName]
        ),
        children
      );
    }
  }]);

  return IconButton;
}(_react.Component);

IconButton.propTypes = {
  iconName: _react.PropTypes.string,
  active: _react.PropTypes.bool,
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  label: _react.PropTypes.string
};
exports.default = IconButton;