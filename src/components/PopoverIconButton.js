import React, { PropTypes, Component } from 'react';
import IconButton from './IconButton';
import InputPopover from './InputPopover';

export default class PopoverIconButton extends Component {
  static propTypes= {
    iconName: PropTypes.string,
    showPopover: PropTypes.bool,
    onTogglePopover: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { props } = this;
    return (
      <IconButton {...props} onClick={this.props.onTogglePopover}>
        {this._renderPopover()}
      </IconButton>
    );
  }

  _renderPopover() {
    if (!this.props.showPopover) {
      return null;
    }
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
