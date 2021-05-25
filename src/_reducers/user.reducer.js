import { userConstants } from '../_constants';


const initialState = {
    synchronized: false,
    email: '',
    name: '',
    surname: '',
    role: 'guest',
    status: 'created',
    codesCount: 0,
};

export function user(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case userConstants.LOAD_SETTINGS_SUCCESS:
            state.synchronized = true;
            return Object.assign({}, {...state, ...action.data});
        case userConstants.LOAD_SETTINGS_FAILURE:
            return Object.assign({...state}, action.data);
        case userConstants.LOGIN_SUCCESS:
            const newState = initialState;
            newState.synchronized = true;
            return Object.assign({}, {...newState, ...action.data});
        case userConstants.UPDATE_PROFILE:
            return Object.assign({}, {...state, ...action.data});
        default:
            return state;
    }
}