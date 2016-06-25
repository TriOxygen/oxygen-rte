import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import IconButton from './IconButton';
import ButtonGroup from './ButtonGroup';
import classNames from 'classnames';
import { Units } from 'Styles';

const css = oxygenCss({
  root: {
    position: 'absolute',
    left: 0,
    top: 36,
    backgroundColor: '#fdfdfd',
    borderRadius: 2,
    border: 'solid 1px #CCCCCC',
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
    ':before': {
      content: '',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      top: -10,
      left: 10,
      border: '5px solid transparent',
      borderBottomColor: '#CCCCCC'
    },
    ':after': {
      content: '',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      top: -9,
      left: 10,
      border: '5px solid transparent',
      borderBottomColor: '#fdfdfd',
    }
  },
  buttonGroup: {

  },
  inner: {
    padding: Units.phone.gutter.mini,
  },
  input: {
    fontSize: 14,
    lineHeight: '24px',
    outline: 'none',
    border: 'none',
  }
});

export default class InputPopover extends Component {
  static propTypes= {
    className: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  };

  componentDidMount() {
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeydown);
    if (this._input) {
      this._input.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  render() {
    const { props } = this;
    const className = classNames(props.className, css.root);
    return (
      <form className={className} onSubmit={this._onSubmit}>
        <div className={css.inner}>
          <input
            ref={_input => this._input = _input}
            type="text"
            placeholder="https://example.com/"
            className={css.input}
          />
          <ButtonGroup className={css.buttonGroup}>
            <IconButton
              label="Cancel"
              iconName="cancel"
              onClick={props.onCancel}
            />
            <IconButton
              label="Submit"
              iconName="accept"
              formSubmit={true}
            />
          </ButtonGroup>
        </div>
      </form>
    );
  }

  _onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let value = this._input ? this._input.value : '';
    this.props.onSubmit(value);
  };

  _onDocumentClick = (event) => {
    let rootNode = ReactDOM.findDOMNode(this);
    if (!rootNode.contains(event.target)) {
      // Here we pass the event so the parent can manage focus.
      this.props.onCancel(event);
    }
  };

  _onDocumentKeydown = (event) => {
    if (event.keyCode === 27) {
      this.props.onCancel();
    }
  };
}
