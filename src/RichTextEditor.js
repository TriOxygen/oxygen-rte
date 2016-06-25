import React, { PropTypes, Component } from 'react';
import {
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
  RichUtils
} from 'draft-js';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import changeBlockDepth from 'lib/changeBlockDepth';
import changeBlockType from 'lib/changeBlockType';
import insertBlockAfter from 'lib/insertBlockAfter';
import isListItem from 'lib/isListItem';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import EditorToolbar from 'components/Toolbar';
import EditorValue from 'lib/EditorValue';
import LinkDecorator from 'lib/LinkDecorator';
import classNames from 'classnames';
import { EventEmitter } from 'events';
import { BLOCK_TYPE } from 'draft-js-utils';
import { Theme, Units } from 'Styles';


const MAX_LIST_DEPTH = 2;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: '#FFF',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: Units.phone.gutter.mini,
  },
};

const css = oxygenCss({
  root: {
    position: 'relative',
    border: 'solid 1px #DDD',
    borderRadius: 2,
  },
  editor: {
    padding: Units.phone.gutter.mini,
  }
});


export default class RichTextEditor extends Component {

  static propTypes= {
    value: PropTypes.object,
    className: PropTypes.string,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    placeholder: PropTypes.bool,
    onChange: PropTypes.func,
    customStyleMap: PropTypes.object,
    theme: PropTypes.object
  };

  static childContextTypes = {
    ortTheme: PropTypes.object
  };

  _keyEmitter = new EventEmitter();

  getChildContext() {
    return {
      ortTheme: this.props.theme || new Theme()
    };
  }

  render(){
    const {
      value,
      className,
      toolbarClassName,
      editorClassName,
      placeholder,
      ...otherProps
    } = this.props;

    const editorState = value.getEditorState();
    const customStyleMap = this.props.customStyleMap ? { ...styleMap, ...this.props.customStyleMap } : styleMap;

    // If the user changes block type before entering any text, we can either
    // style the placeholder or hide it. Let's just hide it for now.
    const combinedEditorClassName = classNames({
      [css.editor]: true,
      [css.hidePlaceholder]: this._shouldHidePlaceholder(),
    }, editorClassName);
    return (
      <div className={classNames(css.root, className)}>
        <EditorToolbar
          className={toolbarClassName}
          keyEmitter={this._keyEmitter}
          editorState={editorState}
          onChange={this._onChange}
          focusEditor={this._focus}
        />
        <div className={combinedEditorClassName}>
          <Editor
            {...otherProps}
            blockStyleFn={getBlockStyle}
            customStyleMap={customStyleMap}
            editorState={editorState}
            handleReturn={this._handleReturn}
            keyBindingFn={this._customKeyHandler}
            handleKeyCommand={this._handleKeyCommand}
            onTab={this._onTab}
            onChange={this._onChange}
            placeholder={placeholder}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }

  _shouldHidePlaceholder() {
    let editorState = this.props.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        return true;
      }
    }
    return false;
  }

  _handleReturn = (event) => {
    if (this._handleReturnSoftNewline(event)) {
      return true;
    }
    if (this._handleReturnEmptyListItem()) {
      return true;
    }
    if (this._handleReturnSpecialBlock()) {
      return true;
    }
    return false;
  }

  // `shift + return` should insert a soft newline.
  _handleReturnSoftNewline(event) {
    let editorState = this.props.value.getEditorState();
    if (isSoftNewlineEvent(event)) {
      let selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        this._onChange(RichUtils.insertSoftNewline(editorState));
      } else {
        let content = editorState.getCurrentContent();
        let newContent = Modifier.removeRange(content, selection, 'forward');
        let newSelection = newContent.getSelectionAfter();
        let block = newContent.getBlockForKey(newSelection.getStartKey());
        newContent = Modifier.insertText(
          newContent,
          newSelection,
          '\n',
          block.getInlineStyleAt(newSelection.getStartOffset()),
          null,
        );
        this._onChange(
          EditorState.push(editorState, newContent, 'insert-fragment')
        );
      }
      return true;
    }
    return false;
  }

  // If the cursor is in an empty list item when return is pressed, then the
  // block type should change to normal (end the list).
  _handleReturnEmptyListItem() {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (isListItem(block) && block.getLength() === 0) {
        let depth = block.getDepth();
        let newState = (depth === 0) ?
          changeBlockType(editorState, blockKey, BLOCK_TYPE.UNSTYLED) :
          changeBlockDepth(editorState, blockKey, depth - 1);
        this._onChange(newState);
        return true;
      }
    }
    return false;
  }

  // If the cursor is at the end of a special block (any block type other than
  // normal or list item) when return is pressed, new block should be normal.
  _handleReturnSpecialBlock() {
    let editorState = this.props.value.getEditorState();
    let selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      let contentState = editorState.getCurrentContent();
      let blockKey = selection.getStartKey();
      let block = contentState.getBlockForKey(blockKey);
      if (!isListItem(block) && block.getType() !== BLOCK_TYPE.UNSTYLED) {
        // If cursor is at end.
        if (block.getLength() === selection.getStartOffset()) {
          let newEditorState = insertBlockAfter(
            editorState,
            blockKey,
            BLOCK_TYPE.UNSTYLED
          );
          this._onChange(newEditorState);
          return true;
        }
      }
    }
    return false;
  }

  _onTab = (event) => {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.onTab(event, editorState, MAX_LIST_DEPTH);
    if (newEditorState !== editorState) {
      this._onChange(newEditorState);
    }
  };

  _customKeyHandler = (event) => {
    // Allow toolbar to catch key combinations.
    let eventFlags = {};
    this._keyEmitter.emit('keypress', event, eventFlags);
    if (eventFlags.wasHandled) {
      return null;
    } else {
      return getDefaultKeyBinding(event);
    }
  };

  _handleKeyCommand = (command) => {
    let editorState = this.props.value.getEditorState();
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this._onChange(newEditorState);
      return true;
    } else {
      return false;
    }
  };

  _onChange = (editorState) => {
    let {onChange, value} = this.props;
    if (onChange != null) {
      let newValue = value.setEditorState(editorState);
      onChange(newValue);
    }
  };

  _focus = () => {
    console.log('Fucos');
    this.refs.editor.focus();
  };
}

const getBlockStyle = (block) => {
  let result = css.block;
  switch (block.getType()) {
    case 'unstyled':
      return classNames(result, css.paragraph);
    case 'blockquote':
      return classNames(result, css.blockquote);
    case 'code-block':
      return classNames(result, css.codeBlock);
    default:
      return result;
  }
};

export const decorator = new CompositeDecorator([LinkDecorator]);

export const createEmptyValue = () => {
  return EditorValue.createEmpty(decorator);
};

export const createValueFromString = (markup, format) => {
  return EditorValue.createFromString(markup, format, decorator);
};

export EditorValue from './lib/EditorValue';
export default RichTextEditor;

