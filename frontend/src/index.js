import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './layout/App';
import reducer from './store/reducer';
import config from './config';
import './assets/scss/style.scss';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename={config.basename}>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
