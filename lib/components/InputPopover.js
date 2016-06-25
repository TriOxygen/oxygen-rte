'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Styles = require('Styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var css = {
  root: 'ort_l',
  buttonGroup: 'ort_m',
  inner: 'ort_n',
  input: 'ort_o'
};

var InputPopover = function (_Component) {
  _inherits(InputPopover, _Component);

  function InputPopover() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, InputPopover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(InputPopover)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._onSubmit = function (event) {
      event.preventDefault();
      event.stopPropagation();
      var value = _this._input ? _this._input.value : '';
      _this.props.onSubmit(value);
    }, _this._onDocumentClick = function (event) {
      var rootNode = _reactDom2.default.findDOMNode(_this);
      if (!rootNode.contains(event.target)) {
        // Here we pass the event so the parent can manage focus.
        _this.props.onCancel(event);
      }
    }, _this._onDocumentKeydown = function (event) {
      if (event.keyCode === 27) {
        _this.props.onCancel();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputPopover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this._onDocumentClick);
      document.addEventListener('keydown', this._onDocumentKeydown);
      if (this._input) {
        this._input.focus();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._onDocumentClick);
      document.removeEventListener('keydown', this._onDocumentKeydown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;

      var className = (0, _classnames2.default)(props.className, css.root);
      return _react2.default.createElement(
        'form',
        { className: className, onSubmit: this._onSubmit },
        _react2.default.createElement(
          'div',
          { className: css.inner },
          _react2.default.createElement('input', {
            ref: function ref(_input) {
              return _this2._input = _input;
            },
            type: 'text',
            placeholder: 'https://example.com/',
            className: css.input
          }),
          _react2.default.createElement(
            _ButtonGroup2.default,
            { className: css.buttonGroup },
            _react2.default.createElement(_IconButton2.default, {
              label: 'Cancel',
              iconName: 'cancel',
              onClick: props.onCancel
            }),
            _react2.default.createElement(_IconButton2.default, {
              label: 'Submit',
              iconName: 'accept',
              formSubmit: true
            })
          )
        )
      );
    }
  }]);

  return InputPopover;
}(_react.Component);

InputPopover.propTypes = {
  className: _react.PropTypes.string,
  onCancel: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func
};
exports.default = InputPopover;