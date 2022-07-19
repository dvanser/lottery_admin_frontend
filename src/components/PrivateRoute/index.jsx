import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../../_library';
import config from '../../config';


export const PrivateRoute = ({ render, minimalRole, exactRole, ...rest }) => {

    if (!store.getState().user.synchronized) {
        return null;
    }

    return <Route {...rest} render={props => {

        const token = localStorage.getItem(config.accessTokenName);

        if (store.getState().authentication.user === undefined && (!token || token === 'undefined')) {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
        } else if ((exactRole === undefined && config.userRoles[store.getState().user.role] >= minimalRole) ||
            (exactRole !== undefined && config.userRoles[store.getState().user.role] === exactRole)) {
            return render(props);
        } else {
            return <Redirect to={{pathname: '/', state: {from: props.location}}}/>;
        }
    }}/>
}