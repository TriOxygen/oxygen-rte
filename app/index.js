import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('../dist/bundle.css');
require('../node_modules/oxygen-md-svg-icons/lib/bundle.css');
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));