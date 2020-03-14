import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './/App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { user } from './store/user/reducer';

// const reducers = combineReducers({ library, exercise });
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(user, composeEnhancer(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
