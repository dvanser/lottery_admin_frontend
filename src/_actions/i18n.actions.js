import { i18nConstants } from '../_constants';


export const i18nActions = {
    changeLanguage
};

function changeLanguage(lang) {
    return dispatch => {
        dispatch((data => {
            return { type: i18nConstants.CHANGE_LANGUAGE, data }
        })({lang}));
    };
}