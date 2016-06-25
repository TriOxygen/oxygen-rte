import React, { PropTypes, Component } from 'react';
import {
  hasCommandModifier
} from 'draft-js/lib/KeyBindingUtil';

import ReactDOM from 'react-dom';
import {
  EditorState,
  Entity,
  RichUtils
} from 'draft-js';
import { ENTITY_TYPE } from 'draft-js-utils';
import {
  INLINE_STYLE_BUTTONS,
  BLOCK_TYPE_DROPDOWN,
  BLOCK_TYPE_BUTTONS,
} from './ToolbarConfig';
import StyleButton from './StyleButton';
import PopoverIconButton from './PopoverIconButton';
import ButtonGroup from './ButtonGroup';
import IconButton from './IconButton';
import getEntityAtCursor from '../lib/getEntityAtCursor';
import clearEntityForRange from '../lib/clearEntityForRange';
import classNames from 'classnames';
import { Units } from '../Styles';

const css = oxygenCss({
  root: {
    userSelect: 'none',
    backgroundColor: '#f2f2f2',
    borderStyle: 'none none solid none',
    borderWidth: 1,
    borderColor: '#DDD',
  }
});

export default class Toolbar extends Component {

  static propTypes = {
    className: PropTypes.string,
    editorState: PropTypes.object,
    keyEmitter: PropTypes.object,
    onChange: PropTypes.func,
    focusEditor: PropTypes.func,
  };

  state = {
    showLinkInput: false,
  };

  static contextTypes = {
    ortTheme: PropTypes.object
  };

  componentWillMount() {
    // Technically, we should also attach/detach event listeners when the
    // `keyEmitter` prop changes.
    this.props.keyEmitter.on('keypress', this._onKeypress);
  }

  componentWillUnmount() {
    this.props.keyEmitter.removeListener('keypress', this._onKeypress);
  }

  render() {
    const { className } = this.props;
    const { toolbar } = this.context.ortTheme;
    return (
      <div className={classNames(css.root, className)} style={toolbar}>
        {this._renderInlineStyleButtons()}
        {this._renderBlockTypeButtons()}
        {this._renderLinkButtons()}
        {this._renderBlockTypeDropdown()}
        {this._renderUndoRedo()}
      </div>
    );
  }

  _renderBlockTypeDropdown() {
    const blockType = this._getCurrentBlockType();
    const buttons = BLOCK_TYPE_DROPDOWN.map((type, index) => (
      <StyleButton
        key={String(index)}
        active={type.style === blockType}
        label={type.label}
        onToggle={this._toggleBlockType}
        style={type.style}
      />
    ));
    return (
      <ButtonGroup>{buttons}</ButtonGroup>
    );
  }

  _renderBlockTypeButtons() {
    const blockType = this._getCurrentBlockType();
    const buttons = BLOCK_TYPE_BUTTONS.map((type, index) => (
      <StyleButton
        key={String(index)}
        active={type.style === blockType}
        label={type.label}
        onToggle={this._toggleBlockType}
        style={type.style}
      />
    ));
    return (
      <ButtonGroup>{buttons}</ButtonGroup>
    );
  }

  _renderInlineStyleButtons() {
    const { editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    const buttons = INLINE_STYLE_BUTTONS.map((type, index) => (
      <StyleButton
        key={String(index)}
        active={currentStyle.has(type.style)}
        label={type.label}
        onToggle={this._toggleInlineStyle}
        style={type.style}
      />
    ));
    return (
      <ButtonGroup>{buttons}</ButtonGroup>
    );
  }

  _renderLinkButtons() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const entity = this._getEntityAtCursor();
    const hasSelection = !selection.isCollapsed();
    const isCursorOnLink = (entity != null && entity.type === ENTITY_TYPE.LINK);
    const shouldShowLinkButton = hasSelection || isCursorOnLink;
    return (
      <ButtonGroup>
        <PopoverIconButton
          label="Link"
          iconName="link"
          isDisabled={!shouldShowLinkButton}
          showPopover={this.state.showLinkInput}
          onTogglePopover={this._toggleShowLinkInput}
          onSubmit={this._setLink}
        />
        <IconButton
          label="Remove Link"
          iconName="remove-link"
          isDisabled={!isCursorOnLink}
          onClick={this._removeLink}
          focusOnClick={false}
        />
      </ButtonGroup>
    );
  }

  _renderUndoRedo() {
    const { editorState } = this.props;
    const canUndo = editorState.getUndoStack().size !== 0;
    const canRedo = editorState.getRedoStack().size !== 0;
    return (
      <ButtonGroup>
        <IconButton
          label="Undo"
          iconName="undo"
          isDisabled={!canUndo}
          onClick={this._undo}
          focusOnClick={false}
        />
        <IconButton
          label="Redo"
          iconName="redo"
          isDisabled={!canRedo}
          onClick={this._redo}
          focusOnClick={false}
        />
      </ButtonGroup>
    );
  }

  _onKeypress = (event, eventFlags) => {
    // Catch cmd+k for use with link insertion.
    if (hasCommandModifier(event) && event.keyCode === 75) {
      // TODO: Ensure there is some text selected.
      this.setState({ showLinkInput: true });
      eventFlags.wasHandled = true;
    }
  };

  _toggleShowLinkInput = (event) => {
    const isShowing = this.state.showLinkInput;
    // If this is a hide request, decide if we should focus the editor.
    if (isShowing) {
      let shouldFocusEditor = true;
      if (event && event.type === 'click') {
        // TODO: Use a better way to get the editor root node.
        const editorRoot = ReactDOM.findDOMNode(this).parentNode;
        const { activeElement } = document;
        const wasClickAway = (activeElement == null || activeElement === document.body);
        if (!wasClickAway && !editorRoot.contains(activeElement)) {
          shouldFocusEditor = false;
        }
      }
      if (shouldFocusEditor) {
        this.props.focusEditor();
      }
    }
    this.setState({ showLinkInput: !isShowing });
  };

  _setLink = (url) => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const entityKey = Entity.create(ENTITY_TYPE.LINK, 'MUTABLE', { url });
    this.setState({ showLinkInput: false });
    this.props.onChange(
      RichUtils.toggleLink(editorState, selection, entityKey)
    );
    this._focusEditor();
  }

  _removeLink = () => {
    const { editorState } = this.props;
    const entity = getEntityAtCursor(editorState);
    if (entity != null) {
      const { blockKey, startOffset, endOffset } = entity;
      this.props.onChange(
        clearEntityForRange(editorState, blockKey, startOffset, endOffset)
      );
    }
  }

  _getEntityAtCursor() {
    const { editorState } = this.props;
    const entity = getEntityAtCursor(editorState);
    return (entity == null) ? null : Entity.get(entity.entityKey);
  }

  _getCurrentBlockType() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  }

  _selectBlockType = (blockType) => {
    this._toggleBlockType(blockType);
    this._focusEditor();
  };

  _toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  };

  _toggleInlineStyle = (inlineStyle) => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  };

  _undo = () => {
    const { editorState } = this.props;
    this.props.onChange(
      EditorState.undo(editorState)
    );
  };

  _redo = () => {
    const { editorState } = this.props;
    this.props.onChange(
      EditorState.redo(editorState)
    );
  };

  _focusEditor = () => {
    // Hacky: Wait to focus the editor so we don't lose selection.
    setTimeout(() => {
      this.props.focusEditor();
    }, 50);
  }
}
