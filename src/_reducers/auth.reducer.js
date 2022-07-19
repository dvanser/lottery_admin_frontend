import { authConstants } from '../_constants';


const initialState = {
    loggedIn: false,
    loginPredefinedData: {},
    synchronized: false
};

export function authentication(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
            state.loggedIn = true;
            state.user = {email: action.data.email, role: action.data.role};
            state.synchronized = true;
            state.loginPredefinedData = {};
            return Object.assign({}, state);
        case authConstants.LOGOUT:
            return Object.assign({}, {...initialState, synchronized: true});
        case authConstants.LOAD_USER_DATA_SUCCESS:

            if (state.synchronized && state.user !== undefined) {
                return state;
            } else {
                state.user = {
                    email: action.data.email,
                    role: action.data.role
                };

                state.loggedIn = true;
                state.synchronized = true;
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}