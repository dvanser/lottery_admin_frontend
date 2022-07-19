import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { history } from './_library';
import { LoadingWithSuspense } from './components';
import { connect } from 'react-redux';
import { userActions } from './_actions/';
import config from './config';
import { PrivateRoute } from './components';

const Login = React.lazy(() => import(/* webpackChunkName: "login" */ './screens/Login/Login').then(module => ({default: module.Login})));
const PageNotFound = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/PageNotFound/PageNotFound').then(module => ({default: module.PageNotFound})));
const Users = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/Users/Users').then(module => ({default: module.Users})));
const UserDetails = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/UserDetails/UserDetails').then(module => ({default: module.UserDetails})));
const PrizeRequests = React.lazy(() => import(/* webpackChunkName: "page_not_found" */ './screens/PrizeRequests/PrizeRequests').then(module => ({default: module.PrizeRequests})));


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
                    <Route exact path="/login" render={(props) => LoadingWithSuspense(Login, props)} />
                    <Route exact path="/404" render={(props) => LoadingWithSuspense(PageNotFound, props)} />
                    <PrivateRoute exact path="/" render={(props) => LoadingWithSuspense(Users, props)}
                                  exactRole={config.userRoles['admin']} />
                    <PrivateRoute exact path="/users" render={(props) => LoadingWithSuspense(Users, props)}
                                  exactRole={config.userRoles['admin']} />
                    <PrivateRoute exact path="/users/details/:userId" render={(props) => LoadingWithSuspense(UserDetails, props)}
                                  exactRole={config.userRoles['admin']} />
                    <PrivateRoute exact path="/prize/requests" render={(props) => LoadingWithSuspense(PrizeRequests, props)}
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
