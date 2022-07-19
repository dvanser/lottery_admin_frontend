import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from './_library/connectedIntlProvider';
import { App } from './App';
import { store } from './_library';
import './assets/scss/pols_style.scss';
import reportWebVitals from './reportWebVitals';


render(
    <Provider store={store}>
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();