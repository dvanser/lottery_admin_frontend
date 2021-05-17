import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';


function mapStateToProps(state) {

    const { lang, messages } = state.i18n;

    return {
        locale: lang,
        key: lang,
        messages
    };
}


const connectedIntlProvider = connect(mapStateToProps)(IntlProvider);
export { connectedIntlProvider as IntlProvider };