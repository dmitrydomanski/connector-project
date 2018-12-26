/* eslint camelcase: 0 */
import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import App from './components/app';
import './style.scss';
import './fontawesome';

import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

const container = document.createElement('div');
document.body.appendChild(container);

if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/login';
    }
}

const routing = (
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

ReactDom.render(routing, container);
