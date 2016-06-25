import { text, theme } from './Colors';

class Theme {

  toolbar = {
  };

  iconButton = {
  };

  buttonGroup = {
  };

  constructor(shade = 'light') {
    this.theme = theme[shade];
    this.text = text[shade === 'light' ? 'dark' : 'light'];
  }
}

export default Theme;
