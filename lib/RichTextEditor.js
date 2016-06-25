'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorValue = exports.createValueFromString = exports.createEmptyValue = exports.decorator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _getDefaultKeyBinding = require('draft-js/lib/getDefaultKeyBinding');

var _getDefaultKeyBinding2 = _interopRequireDefault(_getDefaultKeyBinding);

var _changeBlockDepth = require('lib/changeBlockDepth');

var _changeBlockDepth2 = _interopRequireDefault(_changeBlockDepth);

var _changeBlockType = require('lib/changeBlockType');

var _changeBlockType2 = _interopRequireDefault(_changeBlockType);

var _insertBlockAfter = require('lib/insertBlockAfter');

var _insertBlockAfter2 = _interopRequireDefault(_insertBlockAfter);

var _isListItem = require('lib/isListItem');

var _isListItem2 = _interopRequireDefault(_isListItem);

var _isSoftNewlineEvent = require('draft-js/lib/isSoftNewlineEvent');

var _isSoftNewlineEvent2 = _interopRequireDefault(_isSoftNewlineEvent);

var _Toolbar = require('components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _EditorValue2 = require('lib/EditorValue');

var _EditorValue3 = _interopRequireDefault(_EditorValue2);

var _LinkDecorator = require('lib/LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('events');

var _draftJsUtils = require('draft-js-utils');

var _Styles = require('Styles');

var _EditorValue4 = require('./lib/EditorValue');

var _EditorValue5 = _interopRequireDefault(_EditorValue4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_LIST_DEPTH = 2;

// Custom overrides for "code" style.
var styleMap = {
  CODE: {
    backgroundColor: '#FFF',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: _Styles.Units.phone.gutter.mini
  }
};

var css = {
  root: 'ort_b',
  editor: 'ort_c'
};

var RichTextEditor = function (_Component) {
  _inherits(RichTextEditor, _Component);

  function RichTextEditor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RichTextEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RichTextEditor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._keyEmitter = new _events.EventEmitter(), _this._handleReturn = function (event) {
      if (_this._handleReturnSoftNewline(event)) {
        return true;
      }
      if (_this._handleReturnEmptyListItem()) {
        return true;
      }
      if (_this._handleReturnSpecialBlock()) {
        return true;
      }
      return false;
    }, _this._onTab = function (event) {
      var editorState = _this.props.value.getEditorState();
      var newEditorState = _draftJs.RichUtils.onTab(event, editorState, MAX_LIST_DEPTH);
      if (newEditorState !== editorState) {
        _this._onChange(newEditorState);
      }
    }, _this._customKeyHandler = function (event) {
      // Allow toolbar to catch key combinations.
      var eventFlags = {};
      _this._keyEmitter.emit('keypress', event, eventFlags);
      if (eventFlags.wasHandled) {
        return null;
      } else {
        return (0, _getDefaultKeyBinding2.default)(event);
      }
    }, _this._handleKeyCommand = function (command) {
      var editorState = _this.props.value.getEditorState();
      var newEditorState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newEditorState) {
        _this._onChange(newEditorState);
        return true;
      } else {
        return false;
      }
    }, _this._onChange = function (editorState) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var value = _this$props.value;

      if (onChange != null) {
        var newValue = value.setEditorState(editorState);
        onChange(newValue);
      }
    }, _this._focus = function () {
      console.log('Fucos');
      _this.refs.editor.focus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RichTextEditor, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ortTheme: this.props.theme || new _Styles.Theme()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props;
      var value = _props.value;
      var className = _props.className;
      var toolbarClassName = _props.toolbarClassName;
      var editorClassName = _props.editorClassName;
      var placeholder = _props.placeholder;

      var otherProps = _objectWithoutProperties(_props, ['value', 'className', 'toolbarClassName', 'editorClassName', 'placeholder']);

      var editorState = value.getEditorState();
      var customStyleMap = this.props.customStyleMap ? _extends({}, styleMap, this.props.customStyleMap) : styleMap;

      // If the user changes block type before entering any text, we can either
      // style the placeholder or hide it. Let's just hide it for now.
      var combinedEditorClassName = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, css.editor, true), _defineProperty(_classNames, css.hidePlaceholder, this._shouldHidePlaceholder()), _classNames), editorClassName);
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(css.root, className) },
        _react2.default.createElement(_Toolbar2.default, {
          className: toolbarClassName,
          keyEmitter: this._keyEmitter,
          editorState: editorState,
          onChange: this._onChange,
          focusEditor: this._focus
        }),
        _react2.default.createElement(
          'div',
          { className: combinedEditorClassName },
          _react2.default.createElement(_draftJs.Editor, _extends({}, otherProps, {
            blockStyleFn: getBlockStyle,
            customStyleMap: customStyleMap,
            editorState: editorState,
            handleReturn: this._handleReturn,
            keyBindingFn: this._customKeyHandler,
            handleKeyCommand: this._handleKeyCommand,
            onTab: this._onTab,
            onChange: this._onChange,
            placeholder: placeholder,
            ref: 'editor',
            spellCheck: true
          }))
        )
      );
    }
  }, {
    key: '_shouldHidePlaceholder',
    value: function _shouldHidePlaceholder() {
      var editorState = this.props.value.getEditorState();
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_handleReturnSoftNewline',


    // `shift + return` should insert a soft newline.
    value: function _handleReturnSoftNewline(event) {
      var editorState = this.props.value.getEditorState();
      if ((0, _isSoftNewlineEvent2.default)(event)) {
        var selection = editorState.getSelection();
        if (selection.isCollapsed()) {
          this._onChange(_draftJs.RichUtils.insertSoftNewline(editorState));
        } else {
          var content = editorState.getCurrentContent();
          var newContent = _draftJs.Modifier.removeRange(content, selection, 'forward');
          var newSelection = newContent.getSelectionAfter();
          var block = newContent.getBlockForKey(newSelection.getStartKey());
          newContent = _draftJs.Modifier.insertText(newContent, newSelection, '\n', block.getInlineStyleAt(newSelection.getStartOffset()), null);
          this._onChange(_draftJs.EditorState.push(editorState, newContent, 'insert-fragment'));
        }
        return true;
      }
      return false;
    }

    // If the cursor is in an empty list item when return is pressed, then the
    // block type should change to normal (end the list).

  }, {
    key: '_handleReturnEmptyListItem',
    value: function _handleReturnEmptyListItem() {
      var editorState = this.props.value.getEditorState();
      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        var contentState = editorState.getCurrentContent();
        var blockKey = selection.getStartKey();
        var block = contentState.getBlockForKey(blockKey);
        if ((0, _isListItem2.default)(block) && block.getLength() === 0) {
          var depth = block.getDepth();
          var newState = depth === 0 ? (0, _changeBlockType2.default)(editorState, blockKey, _draftJsUtils.BLOCK_TYPE.UNSTYLED) : (0, _changeBlockDepth2.default)(editorState, blockKey, depth - 1);
          this._onChange(newState);
          return true;
        }
      }
      return false;
    }

    // If the cursor is at the end of a special block (any block type other than
    // normal or list item) when return is pressed, new block should be normal.

  }, {
    key: '_handleReturnSpecialBlock',
    value: function _handleReturnSpecialBlock() {
      var editorState = this.props.value.getEditorState();
      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        var contentState = editorState.getCurrentContent();
        var blockKey = selection.getStartKey();
        var block = contentState.getBlockForKey(blockKey);
        if (!(0, _isListItem2.default)(block) && block.getType() !== _draftJsUtils.BLOCK_TYPE.UNSTYLED) {
          // If cursor is at end.
          if (block.getLength() === selection.getStartOffset()) {
            var newEditorState = (0, _insertBlockAfter2.default)(editorState, blockKey, _draftJsUtils.BLOCK_TYPE.UNSTYLED);
            this._onChange(newEditorState);
            return true;
          }
        }
      }
      return false;
    }
  }]);

  return RichTextEditor;
}(_react.Component);

RichTextEditor.propTypes = {
  value: _react.PropTypes.object,
  className: _react.PropTypes.string,
  toolbarClassName: _react.PropTypes.string,
  editorClassName: _react.PropTypes.string,
  placeholder: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  customStyleMap: _react.PropTypes.object,
  theme: _react.PropTypes.object
};
RichTextEditor.childContextTypes = {
  ortTheme: _react.PropTypes.object
};
exports.default = RichTextEditor;


var getBlockStyle = function getBlockStyle(block) {
  var result = css.block;
  switch (block.getType()) {
    case 'unstyled':
      return (0, _classnames2.default)(result, css.paragraph);
    case 'blockquote':
      return (0, _classnames2.default)(result, css.blockquote);
    case 'code-block':
      return (0, _classnames2.default)(result, css.codeBlock);
    default:
      return result;
  }
};

var decorator = exports.decorator = new _draftJs.CompositeDecorator([_LinkDecorator2.default]);

var createEmptyValue = exports.createEmptyValue = function createEmptyValue() {
  return _EditorValue3.default.createEmpty(decorator);
};

var createValueFromString = exports.createValueFromString = function createValueFromString(markup, format) {
  return _EditorValue3.default.createFromString(markup, format, decorator);
};

exports.EditorValue = _EditorValue5.default;
exports.default = RichTextEditor;