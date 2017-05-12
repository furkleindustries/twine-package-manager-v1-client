// react
import React from 'react';

// react-router
import { Router, Route, IndexRoute, browserHistory, } from 'react-router';

// redux
import { Provider, } from 'react-redux';
import store from './store';

// components
import App from './App';
import Home from './panes/home/home';
import Forum from './panes/forum/forum';
import Search from './panes/search/search';
import About from './panes/about/about';
import Login from './panes/login/login';
import Profile from './panes/profile/profile';
import FourOhFour from './panes/404/404';

const baseUrl = process.env.PUBLIC_URL;

const rootComponent = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={`${baseUrl}/`} component={App}>
                <IndexRoute component={Home} />
                <Route path={`${baseUrl}/forum`} component={Forum} />
                <Route path={`${baseUrl}/search`} component={Search} />
                <Route path={`${baseUrl}/about`} component={About} />
                <Route path={`${baseUrl}/login`} component={Login} />
                <Route path={`${baseUrl}/profile`} component={Profile} />
                <Route path={`${baseUrl}/*`} component={FourOhFour} />
            </Route>
        </Router>
    </Provider>
);

export default rootComponent;