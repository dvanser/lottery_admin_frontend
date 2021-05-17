import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { history } from './_library';
import { LoadingWithSuspense } from './components';
import { connect } from 'react-redux';
import { PrivateRoute } from './components';
import { userActions } from './_actions/';
import config from './config';


const Login = React.lazy(() => import(/* webpackChunkName: "login" */ './screens/Login/Login').then(module => ({default: module.Login})));
const Test = React.lazy(() => import(/* webpackChunkName: "test" */ './screens/Test/Test').then(module => ({default: module.TestScreen})));
const Dashboard = React.lazy(() => import(/* webpackChunkName: "dashboard" */ './screens/Dashboard/Dashboard').then(module => ({default: module.Dashboard})));
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/PageNotFound/PageNotFound').then(module => ({default: module.PageNotFound})));


class App extends Component {

    componentDidMount() {
        if (!this.props.user.synchronized) {
            this.props.loadSettings();
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/test" render={(props) => LoadingWithSuspense(Test, props)} />
                    <Route exact path="/login/:token?" render={(props) => LoadingWithSuspense(Login, props)} />
                    <Route exact path="/404" render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                    <PrivateRoute exact path="/" render={(props) => LoadingWithSuspense(Dashboard, props)}
                                  exactRole={config.userRoles['admin']} />
                    <Route render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                </Switch>
            </Router>
        );
    }
}


function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {
    return({
        loadSettings: () => {
            dispatch(userActions.loadSettings())
        }
    })
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };