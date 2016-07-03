import React, { Component, PropTypes } from 'react';
import IconButton from './IconButton';

export default class StyleButton extends Component {
  static propTypes= {
    style: PropTypes.node,
    onToggle: PropTypes.func
  };

  render() {
    const { style, onToggle, ...otherProps } = this.props;
    const iconName = style.toLowerCase();
    // `focusOnClick` will prevent the editor from losing focus when a control
    // button is clicked.
    return (
      <IconButton
        {...otherProps}
        iconName={iconName}
        onClick={this._onClick}
        focusOnClick={false}
      />
    );
  }

  _onClick = () => {
    this.props.onToggle(this.props.style);
  };
}
