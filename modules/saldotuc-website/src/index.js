import React from 'react';
import { render } from 'react-dom';

import 'sanitize.css/sanitize.css';
import './style';

import App from 'App';

import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));

registerServiceWorker();
