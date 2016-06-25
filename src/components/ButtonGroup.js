import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Units } from 'Styles';

const css = oxygenCss({
  root: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    margin: Units.phone.gutter.mini,
    whiteSpace: 'nowrap',
    backgroundColor: '#FFF',
    borderRadius: 2,
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
    ':last-child': {
      marginRight: 0,
    }
  }
});

export default function ButtonGroup({ className, ...other }) {
  return (
    <div {...other} className={classNames(className, css.root)} />
  );
}

ButtonGroup.propTypes = {
  className: PropTypes.string
};