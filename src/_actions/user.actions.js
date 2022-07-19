import { userConstants, authConstants } from '../_constants';
import { getRequest } from '../_library';
import config from '../config';


export const userActions = {
    loadSettings
};

function loadSettings() {
    return dispatch => {
        getRequest('/admins/profile')
            .then(data => {
                dispatch(success(data));
                dispatch(loggedInData(data));
            }).catch(error => {
                localStorage.removeItem(config.accessTokenName);
                dispatch(logout());
                dispatch(success({}));
            });
    };

    function success(data) { return { type: userConstants.LOAD_SETTINGS_SUCCESS, data } }
    function loggedInData(data) { return { type: authConstants.LOAD_USER_DATA_SUCCESS, data } }
    function logout() { return { type: authConstants.LOGOUT } }
}