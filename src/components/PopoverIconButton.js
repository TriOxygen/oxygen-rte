import React, { PropTypes, Component } from 'react';
import IconButton from './IconButton';
import InputPopover from './InputPopover';

export default class PopoverIconButton extends Component {
  static propTypes= {
    showPopover: PropTypes.bool,
    onTogglePopover: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { showPopover, onTogglePopover, onSubmit, ...otherProps } = this.props;
    return (
      <IconButton {...otherProps} onClick={this.props.onTogglePopover}>
        {showPopover && this._renderPopover()}
      </IconButton>
    );
  }

  _renderPopover() {
    return (
      <InputPopover
        onSubmit={this._onSubmit}
        onCancel={this._hidePopover}
      />
    );
  }

  _onSubmit = () => {
    this.props.onSubmit(...arguments);
  };

  _hidePopover = () => {
    if (this.props.showPopover) {
      this.props.onTogglePopover(...arguments);
    }
  };
}
