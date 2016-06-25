import React, { PropTypes } from 'react';
import classNames from 'classnames';

const css = oxygenCss({
  root: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 10
  }
});

export default function ButtonWrap ({ className, ...other }) {
  return <div {...other} className={classNames(className, css.root)} />;
}

ButtonWrap.propTypes = {
  className: PropTypes.string
}