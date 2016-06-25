/* @flow */
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';

export default class EditorValue {

  constructor(editorState, cache = {}) {
    this._cache = cache;
    this._editorState = editorState;
  }

  getEditorState() {
    return this._editorState;
  }

  setEditorState(editorState) {
    return (this._editorState === editorState) ?
      this :
      new EditorValue(editorState);
  }

  toString(format) {
    const fromCache = this._cache[format];
    if (fromCache != null) {
      return fromCache;
    }
    return (this._cache[format] = toString(this.getEditorState(), format));
  }

  setContentFromString(markup, format) {
    const editorState = EditorState.push(
      this._editorState,
      fromString(markup, format),
      'secondary-paste'
    );
    return new EditorValue(editorState, { [format]: markup });
  }

  static createEmpty(decorator) {
    const editorState = EditorState.createEmpty(decorator);
    return new EditorValue(editorState);
  }

  static createFromState(editorState) {
    return new EditorValue(editorState);
  }

  static createFromString(markup, format, decorator) {
    const contentState = fromString(markup, format);
    const editorState = EditorState.createWithContent(contentState, decorator);
    return new EditorValue(editorState, { [format]: markup });
  }
}

const toString = (editorState, format) => {
  const contentState = editorState.getCurrentContent();
  switch (format) {
    case 'html': {
      return stateToHTML(contentState);
    }
    case 'markdown': {
      return stateToMarkdown(contentState);
    }
    default: {
      throw new Error('Format not supported: ' + format);
    }
  }
};

const fromString = (markup, format) => {
  switch (format) {
    case 'html': {
      return stateFromHTML(markup);
    }
    case 'markdown': {
      return stateFromMarkdown(markup);
    }
    default: {
      throw new Error('Format not supported: ' + format);
    }
  }
};
