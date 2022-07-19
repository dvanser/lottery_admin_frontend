import localeData from '../translations/i18n.json';
import { i18nConstants } from '../_constants';

const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

// const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const languageWithoutRegionCode = 'lv';

const initialState = {
    lang: 'lv',
    messages: localeData[languageWithoutRegionCode] || localeData[language] || localeData.lv
};

const supportedLanguages = ['LV', 'RU'];

export function i18n(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case i18nConstants.CHANGE_LANGUAGE:

            if (action.data.lang === null || action.data.lang === undefined || !supportedLanguages.includes(action.data.lang.toString().toUpperCase())) {
                state.lang = 'lv';
            } else {
                state.lang = action.data.lang;
            }

            state.messages = localeData[action.data.lang];
            return Object.assign({}, state);
        default:
            return state;
    }
}