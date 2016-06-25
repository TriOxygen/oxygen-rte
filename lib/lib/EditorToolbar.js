'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyBindingUtil = require('draft-js/lib/KeyBindingUtil');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _draftJsUtils = require('draft-js-utils');

var _EditorToolbarConfig = require('./EditorToolbarConfig');

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _PopoverIconButton = require('../components/PopoverIconButton');

var _PopoverIconButton2 = _interopRequireDefault(_PopoverIconButton);

var _ButtonGroup = require('../components/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _IconButton = require('../components/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _getEntityAtCursor2 = require('./getEntityAtCursor');

var _getEntityAtCursor3 = _interopRequireDefault(_getEntityAtCursor2);

var _clearEntityForRange = require('./clearEntityForRange');

var _clearEntityForRange2 = _interopRequireDefault(_clearEntityForRange);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Styles = require('Styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var css = {
  root: 'ort_d'
};

var EditorToolbar = function (_Component) {
  _inherits(EditorToolbar, _Component);

  function EditorToolbar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EditorToolbar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      showLinkInput: false
    }, _this._onKeypress = function (event, eventFlags) {
      // Catch cmd+k for use with link insertion.
      if ((0, _KeyBindingUtil.hasCommandModifier)(event) && event.keyCode === 75) {
        // TODO: Ensure there is some text selected.
        _this.setState({ showLinkInput: true });
        eventFlags.wasHandled = true;
      }
    }, _this._toggleShowLinkInput = function (event) {
      var isShowing = _this.state.showLinkInput;
      // If this is a hide request, decide if we should focus the editor.
      if (isShowing) {
        var shouldFocusEditor = true;
        if (event && event.type === 'click') {
          // TODO: Use a better way to get the editor root node.
          var editorRoot = _reactDom2.default.findDOMNode(_this).parentNode;
          var _document = document;
          var activeElement = _document.activeElement;

          var wasClickAway = activeElement == null || activeElement === document.body;
          if (!wasClickAway && !editorRoot.contains(activeElement)) {
            shouldFocusEditor = false;
          }
        }
        if (shouldFocusEditor) {
          _this.props.focusEditor();
        }
      }
      _this.setState({ showLinkInput: !isShowing });
    }, _this._setLink = function (url) {
      var editorState = _this.props.editorState;

      var selection = editorState.getSelection();
      var entityKey = _draftJs.Entity.create(_draftJsUtils.ENTITY_TYPE.LINK, 'MUTABLE', { url: url });
      _this.setState({ showLinkInput: false });
      _this.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, entityKey));
      _this._focusEditor();
    }, _this._removeLink = function () {
      var editorState = _this.props.editorState;

      var entity = (0, _getEntityAtCursor3.default)(editorState);
      if (entity != null) {
        var blockKey = entity.blockKey;
        var startOffset = entity.startOffset;
        var endOffset = entity.endOffset;

        _this.props.onChange((0, _clearEntityForRange2.default)(editorState, blockKey, startOffset, endOffset));
      }
    }, _this._selectBlockType = function (blockType) {
      _this._toggleBlockType(blockType);
      _this._focusEditor();
    }, _this._toggleBlockType = function (blockType) {
      _this.props.onChange(_draftJs.RichUtils.toggleBlockType(_this.props.editorState, blockType));
    }, _this._toggleInlineStyle = function (inlineStyle) {
      _this.props.onChange(_draftJs.RichUtils.toggleInlineStyle(_this.props.editorState, inlineStyle));
    }, _this._undo = function () {
      var editorState = _this.props.editorState;

      _this.props.onChange(_draftJs.EditorState.undo(editorState));
    }, _this._redo = function () {
      var editorState = _this.props.editorState;

      _this.props.onChange(_draftJs.EditorState.redo(editorState));
    }, _this._focusEditor = function () {
      // Hacky: Wait to focus the editor so we don't lose selection.
      setTimeout(function () {
        _this.props.focusEditor();
      }, 50);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditorToolbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Technically, we should also attach/detach event listeners when the
      // `keyEmitter` prop changes.
      this.props.keyEmitter.on('keypress', this._onKeypress);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.keyEmitter.removeListener('keypress', this._onKeypress);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(css.root, className) },
        this._renderInlineStyleButtons(),
        this._renderBlockTypeButtons(),
        this._renderLinkButtons(),
        this._renderBlockTypeDropdown(),
        this._renderUndoRedo()
      );
    }
  }, {
    key: '_renderBlockTypeDropdown',
    value: function _renderBlockTypeDropdown() {
      var _this2 = this;

      var blockType = this._getCurrentBlockType();
      var buttons = _EditorToolbarConfig.BLOCK_TYPE_DROPDOWN.map(function (type, index) {
        return _react2.default.createElement(_StyleButton2.default, {
          key: String(index),
          isActive: type.style === blockType,
          label: type.label,
          onToggle: _this2._toggleBlockType,
          style: type.style
        });
      });
      return _react2.default.createElement(
        _ButtonGroup2.default,
        null,
        buttons
      );
    }
  }, {
    key: '_renderBlockTypeButtons',
    value: function _renderBlockTypeButtons() {
      var _this3 = this;

      var blockType = this._getCurrentBlockType();
      var buttons = _EditorToolbarConfig.BLOCK_TYPE_BUTTONS.map(function (type, index) {
        return _react2.default.createElement(_StyleButton2.default, {
          key: String(index),
          isActive: type.style === blockType,
          label: type.label,
          onToggle: _this3._toggleBlockType,
          style: type.style
        });
      });
      return _react2.default.createElement(
        _ButtonGroup2.default,
        null,
        buttons
      );
    }
  }, {
    key: '_renderInlineStyleButtons',
    value: function _renderInlineStyleButtons() {
      var _this4 = this;

      var editorState = this.props.editorState;

      var currentStyle = editorState.getCurrentInlineStyle();
      var buttons = _EditorToolbarConfig.INLINE_STYLE_BUTTONS.map(function (type, index) {
        return _react2.default.createElement(_StyleButton2.default, {
          key: String(index),
          isActive: currentStyle.has(type.style),
          label: type.label,
          onToggle: _this4._toggleInlineStyle,
          style: type.style
        });
      });
      return _react2.default.createElement(
        _ButtonGroup2.default,
        null,
        buttons
      );
    }
  }, {
    key: '_renderLinkButtons',
    value: function _renderLinkButtons() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      var entity = this._getEntityAtCursor();
      var hasSelection = !selection.isCollapsed();
      var isCursorOnLink = entity != null && entity.type === _draftJsUtils.ENTITY_TYPE.LINK;
      var shouldShowLinkButton = hasSelection || isCursorOnLink;
      return _react2.default.createElement(
        _ButtonGroup2.default,
        null,
        _react2.default.createElement(_PopoverIconButton2.default, {
          label: 'Link',
          iconName: 'link',
          isDisabled: !shouldShowLinkButton,
          showPopover: this.state.showLinkInput,
          onTogglePopover: this._toggleShowLinkInput,
          onSubmit: this._setLink
        }),
        _react2.default.createElement(_IconButton2.default, {
          label: 'Remove Link',
          iconName: 'remove-link',
          isDisabled: !isCursorOnLink,
          onClick: this._removeLink,
          focusOnClick: false
        })
      );
    }
  }, {
    key: '_renderUndoRedo',
    value: function _renderUndoRedo() {
      var editorState = this.props.editorState;

      var canUndo = editorState.getUndoStack().size !== 0;
      var canRedo = editorState.getRedoStack().size !== 0;
      return _react2.default.createElement(
        _ButtonGroup2.default,
        null,
        _react2.default.createElement(_IconButton2.default, {
          label: 'Undo',
          iconName: 'undo',
          isDisabled: !canUndo,
          onClick: this._undo,
          focusOnClick: false
        }),
        _react2.default.createElement(_IconButton2.default, {
          label: 'Redo',
          iconName: 'redo',
          isDisabled: !canRedo,
          onClick: this._redo,
          focusOnClick: false
        })
      );
    }
  }, {
    key: '_getEntityAtCursor',
    value: function _getEntityAtCursor() {
      var editorState = this.props.editorState;

      var entity = (0, _getEntityAtCursor3.default)(editorState);
      return entity == null ? null : _draftJs.Entity.get(entity.entityKey);
    }
  }, {
    key: '_getCurrentBlockType',
    value: function _getCurrentBlockType() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    }
  }]);

  return EditorToolbar;
}(_react.Component);

EditorToolbar.propTypes = {
  className: _react.PropTypes.string,
  editorState: _react.PropTypes.object,
  keyEmitter: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  focusEditor: _react.PropTypes.func
};
exports.default = EditorToolbar;