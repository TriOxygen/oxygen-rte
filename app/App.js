import React, { PropTypes, Component } from 'react';
import RichTextEditor, {
  createEmptyValue
} from 'RichTextEditor';

const css = oxygenCss({
  BODY: {
    fontSize: 14,
    margin: 0,
    padding: 0,
    fontFamily: '\'Product Sans\', Arial, sans-serif',
    fontSize: 14,
    fontWeight: 400,
  },
  HTML: {
    fontSize: 14,
    margin: 0,
    padding: 0,
    fontFamily: '\'Product Sans\', Arial, sans-serif',
    fontSize: 14,
    fontWeight: 400,
  },
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: 12
  }
});

export default class App extends Component {

  state = {
    value: createEmptyValue()
  };

  getStyle() {
    return {
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className={css.root} style={this.getStyle()}>
        <RichTextEditor
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
