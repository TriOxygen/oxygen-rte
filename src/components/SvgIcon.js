import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';

const styles = oxygenCss({
  icon: {
    display: 'inline-block',
    height: 16,
    width: 16,
    userSelect: 'none',
    transition: 'cubic-bezier(0.23, 1, 0.32, 1)',
    verticalAlign: 'middle',
    fill: 'currentColor',
  },
  block: {
    display: 'block'
  }
});

class SvgIcon extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    viewBox: PropTypes.string,
    block: PropTypes.bool
  };

  static defaultProps = {
    viewBox: '0 0 1792 1792',
  };

  state = {
    mouseOver: false
  };


  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  render() {
    const {
      className,
      block,
      children,
      viewBox,
      ...other,
    } = this.props;


    const classes = classNames(styles.icon, className, {
      [styles.block]: block
    })

    return (
      <svg
        {...other}
        className={classes}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }
}

export default SvgIcon;