import { authConstants, userConstants } from '../_constants';
import { postRequest, getRequest, history } from '../_library';
import config from '../config';


export const authActions = {
    login,
    logout
};

function login(data) {
    return dispatch => {
        getRequest('/admins/profile')
            .then(data => {
                dispatch(success(data));
                dispatch(loggedInData(data));

                history.push('/');
            }).catch(error => {

                if (error.error) {
                    dispatch(logout())
                }

                dispatch(failure(error));
            });
    };

    function success(data) { return { type: authConstants.LOGIN_SUCCESS, data } }
    function loggedInData(data) { return { type: userConstants.LOAD_SETTINGS_SUCCESS, data } }
    function failure(error) { return { type: userConstants.LOAD_SETTINGS_FAILURE, error } }
}

function logout() {
    return dispatch => {
        postRequest('/logout', null)
            .then(
                data => {
                    localStorage.removeItem(config.accessTokenName);
                    dispatch(success());
                    dispatch(resetUser());
                    history.push('/');
                },
                error => {
                    localStorage.removeItem(config.accessTokenName);
                    dispatch(failure());
                    history.push('/');
                }
            );
    };

    function success() { return { type: authConstants.LOGOUT } }
    function resetUser() { return { type: userConstants.RESET_SETTINGS } }
    function failure() { return { type: authConstants.LOGOUT } }
}