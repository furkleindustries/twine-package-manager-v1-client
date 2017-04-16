// react
import React from 'react';

// react-router
import { Router, Route, IndexRoute, browserHistory, } from 'react-router';

// redux
import { Provider } from 'react-redux';
import store from './store';

// components
import App from './App';
import Home from './panes/home/home';
import News from './panes/news/news';
import Search from './panes/search/search';
import Previous from './panes/previous/previous';
import About from './panes/about/about';
import Enter from './panes/enter/enter';
import Login from './panes/login/login';
import Profile from './panes/profile/profile';


const baseUrl = process.env.PUBLIC_URL;

const rootComponent = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={baseUrl + "/"} component={App}>
                <IndexRoute component={Home} />
                <Route path={baseUrl + "/news"} component={News} />
                <Route path={baseUrl + "/search"} component={Search} />
                <Route path={baseUrl + "/previous"} component={Previous} />
                <Route path={baseUrl + "/about"} component={About} />
                <Route path={baseUrl + "/enter"} component={Enter} />
                <Route path={baseUrl + "/login"} component={Login} />
                <Route path={baseUrl + "/profile"} component={Profile} />
            </Route>
        </Router>
    </Provider>
);

export default rootComponent;