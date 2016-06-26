import {
  CompositeDecorator,
} from 'draft-js';
import EditorValue from './lib/EditorValue';
import LinkDecorator from './lib/LinkDecorator';
export const decorator = new CompositeDecorator([LinkDecorator]);

export const createEmptyValue = () => {
  return EditorValue.createEmpty(decorator);
};

export const createValueFromString = (markup, format) => {
  return EditorValue.createFromString(markup, format, decorator);
};

export EditorValue from './lib/EditorValue';

export RichTextEditor from './RichTextEditor';