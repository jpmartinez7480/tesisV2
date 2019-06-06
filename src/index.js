import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './layouts/layout'
import Home from './views/Home/Home'

import { HashRouter, Route, Switch } from "react-router-dom";
import indexRoutes from './routes/index'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import allReducers from './reducers/index'
import thunk from 'redux-thunk';
const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store = {store}>
        <HashRouter>
            <Switch>
                {/*<Route exact path = "/home" component = {Layout} />*/}
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("root")
)

//ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
