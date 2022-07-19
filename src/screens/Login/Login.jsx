import React, { useState } from 'react';
import { authActions, i18nActions } from '../../_actions'
import { connect } from 'react-redux';
import config from '../../config';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form, Block, Text } from '../../components/';
import * as Yup from 'yup';
import { postRequest } from '../../_library/request';
import { store } from '../../_library/store';
import loginPageStyle from './LoginPageStyle.module.scss';
import {Col, Container, Row} from "reactstrap";


const Login = () => {

    const [errorMessage,setErrorMessage] = useState('');

    const intl = useIntl();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
          .min(2, intl.formatMessage({id:'pols.login.validation.password_min'}))
          .max(70, intl.formatMessage({id:'pols.login.validation.password_max'}))
          .required(intl.formatMessage({id:'pols.login.validation.password_required'})),
        email: Yup.string()
          .email(intl.formatMessage({id:'pols.login.validation.email_invalid'}))
          .required(intl.formatMessage({id:'pols.login.validation.email_required'})),
      });

    const onSubmit = value => postRequest('/login', value).then(response => { 
        localStorage.setItem(config.accessTokenName, response.accessToken);
        store.dispatch(authActions.login(response))}  
     ).catch(error => {
         error.error ? setErrorMessage(<FormattedMessage id={`pols.login.error.${error.error}`}/>)  : setErrorMessage(<FormattedMessage id="pols.login.error.something"/>);
     });

    return(
        <Container>
            <Row>
                <Col xs={6}>
                    <Text className="mt-5" left h1 label="pols.login.title" />
                    {errorMessage && <Text error className={loginPageStyle.errorMessage}>{errorMessage}</Text> }
                    <Form initialValues={{email: '', password: ''}}
                          inputFields={[{name:'email', type:'email', label:intl.formatMessage({id:'pols.login.email'})},
                                        {name:'password', type:'password', label:intl.formatMessage({id:'pols.login.password'})}]}
                          onSubmit={value => onSubmit(value)}
                          validationSchema={validationSchema}
                          buttonText={<FormattedMessage id="pols.login.btn.submit"/>}
                    />
                </Col>
            </Row>
        </Container>
    );
};


function mapStateToProps(state) {

    return {
    };
}

function mapDispatchToProps(dispatch) {
    return({
        login: (email) => {
            dispatch(authActions.login(email))
        }
    })
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export { connectedLogin as Login };
