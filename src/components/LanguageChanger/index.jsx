import React from 'react'
import config from '../../config';
import LanguageChangerStyle from './LanguageChangerStyle.module.scss'
import { connect } from 'react-redux';
import { i18nActions } from '../../_actions';

const LanguageChanger = props => {

    const renderLangItem = (lang, reverse = false, onClick = false) => (
        <span {...(onClick ? {onClick} : undefined)}>
            {lang === props.lang ? <h4>{lang}</h4> : <>{lang}</>}
        </span>
    );

    return (
        <div className={LanguageChangerStyle.languageChoose}>
            {config.supportedLangs.map((lang, idx) =>
                    <div key={idx}>
                            {renderLangItem(lang, true, () => props.changeLanguage(lang))}
                    </div>)
            }
        </div>
)}

function mapStateToProps(state) {

    const { lang } = state.i18n;

    return {
        lang
    };
}

function mapDispatchToProps(dispatch) {
    return({
        changeLanguage: lang => {
            dispatch(i18nActions.changeLanguage(lang))
        }
    })
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(LanguageChanger);

export { connectedLogin as LanguageChanger };