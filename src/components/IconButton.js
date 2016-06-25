/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from './Button';
import ButtonWrap from './ButtonWrap';

const css = oxygenCss({
  root: {
    cursor: 'pointer',
    position: 'relative',
    background: 'none',
    border: 'none',
    minWidth: 32,
    minHeight: 24,
    color: '#777',
    lineHeight: '24px',
    fontSize: '16px',
    '&active': {
      color: '#333',
      background: 'none #CCC',
    },
    ':hover': {
      backgroundColor: '#DDD'
    }
  }
});

import Bold from '../icons/Bold';
import Italic from '../icons/Italic';
import Strikethrough from '../icons/Strikethrough';
import Code from '../icons/Code';

import ListUl from '../icons/ListUl';
import ListOl from '../icons/ListOl';
import QuoteLeft from '../icons/QuoteLeft';

import Link from '../icons/Link';
import ChainBroken from '../icons/ChainBroken';

import Undo from '../icons/Undo';
import Repeat from '../icons/Repeat';

import Check from '../icons/Check';
import Times from '../icons/Times';

const Icons = {
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  ['unordered-list-item']: ListUl,
  ['ordered-list-item']: ListOl,
  ['blockquote']: QuoteLeft,
  link: Link,
  ['remove-link']: ChainBroken,
  undo: Undo,
  redo: Repeat,
  'code-block': Code,
  'accept': Check,
  'cancel': Times,
};

const iconText = {
  code: '{}',
  unstyled: 'p',
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
};

export default class IconButton extends Component {
  static propTypes= {
    iconName: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    label: PropTypes.string
  };

  render(): React.Element {
    const {
      className,
      iconName,
      label,
      children,
      active,
      ...otherProps
    } = this.props;
    const classes = classNames(className, css.root, {
      [css.active]: active,
    });
    const Icon = Icons[iconName];
    return (
      <ButtonWrap>
        <Button {...otherProps} title={label} className={classes}>
          {Icon ? <Icon /> : iconText[iconName]}
        </Button>
        {children}
      </ButtonWrap>
    );
  }
}
