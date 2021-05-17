import { combineReducers } from 'redux';
import { i18n } from './i18n.reducer';
import { authentication } from './auth.reducer';
import { user } from './user.reducer';


const rootReducer = combineReducers({
    i18n,
    authentication,
    user
});

export default rootReducer;