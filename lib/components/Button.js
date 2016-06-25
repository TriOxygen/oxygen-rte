'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var css = {
  root: 'ort_k'
};

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Button)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._onMouseDownPreventDefault = function (event) {
      event.preventDefault();
      var onMouseDown = _this.props.onMouseDown;

      onMouseDown && onMouseDown(event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',


    // getStyle() {
    //   const { text, theme } = this.context.ortTheme;
    //   const { isDisabled, style } = this.props;
    //   return {
    //     color: text.default,
    //     backgroundColor: theme.card,
    //     ...(isDisabled ? {
    //       color: text.disabled
    //     } : null),
    //     ...style
    //   }
    // }

    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var formSubmit = _props.formSubmit;
      var className = _props.className;
      var isDisabled = _props.isDisabled;
      var focusOnClick = _props.focusOnClick;

      var otherProps = _objectWithoutProperties(_props, ['children', 'formSubmit', 'className', 'isDisabled', 'focusOnClick']);

      var classes = (0, _classnames2.default)(className, css.root);
      var onMouseDown = focusOnClick === false ? this._onMouseDownPreventDefault : this.props.onMouseDown;
      var type = formSubmit ? 'submit' : 'button';
      return _react2.default.createElement(
        'button',
        _extends({
          type: type
        }, otherProps, {
          onMouseDown: onMouseDown,
          className: classes,
          disabled: isDisabled
          // style={this.getStyle()}
        }),
        children
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  focusOnClick: _react.PropTypes.bool,
  formSubmit: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool,
  onMouseDown: _react.PropTypes.func
};
exports.default = Button;