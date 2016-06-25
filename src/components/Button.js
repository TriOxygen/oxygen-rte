import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

export default class Button extends Component {
  static propTypes= {
    children: PropTypes.node,
    className: PropTypes.string,
    focusOnClick: PropTypes.bool,
    formSubmit: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onMouseDown: PropTypes.func
  };

  // getStyle() {
  //   const { text, theme } = this.context.ortTheme;
  //   const { isDisabled, style } = this.props;
  //   return {
  //     color: text.default,
  //     backgroundColor: theme.card,
  //     ...(isDisabled ? {
  //       color: text.disabled
  //     } : null),
  //     ...style
  //   }
  // }

  render() {
    const { children, formSubmit, className, isDisabled, focusOnClick, ...otherProps } = this.props;
    const classes = classNames(className, css.root);
    let onMouseDown = (focusOnClick === false) ? this._onMouseDownPreventDefault : this.props.onMouseDown;
    let type = formSubmit ? 'submit' : 'button';
    return (
      <button
        type={type}
        {...otherProps}
        onMouseDown={onMouseDown}
        className={classes}
        disabled={isDisabled}
        // style={this.getStyle()}
      >
        {children}
      </button>
    );
  }

  _onMouseDownPreventDefault = (event) => {
    event.preventDefault();
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown(event);
  };
}
