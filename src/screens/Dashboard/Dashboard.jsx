import React from 'react';
import { i18nActions } from '../../_actions'
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';


const Dashboard = props => {
    const renderLangItem = (lang, reverse = false, onClick = false) => (
        <span {...(onClick ? {onClick} : undefined)}>
            {lang === props.lang ? <h4>{lang}</h4> : <>{lang}</>}
        </span>
    );

    const intl = useIntl();

    return (
        <BrowserRouter>
            <div>Main</div>
        </BrowserRouter>
    );
}

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
const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { connectedDashboard as Dashboard };