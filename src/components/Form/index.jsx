import React from 'react';
import PropTypes from 'prop-types';
import { useFormik, ErrorMessage } from 'formik';
import { Button, Input } from '../../components';
import formStyle from './FormStyles.module.scss';
import {Text} from "../Text";

export const Form = props => {

    const formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        validationSchema: props.validationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit} className={formStyle.form}>
            {props.inputFields.map((key,idx) => (<> <Input
                key={idx}
                label={key.label}
                onChange={(value) => {formik.setFieldValue(key.name,value)}}
                value={formik.values[key.name]}
                name={key.name}
                type={key.type}
                className={formStyle.input}
            />
            {formik.touched[key.name] && formik.errors[key.name] && <Text error>{formik.errors[key.name]}</Text>}
            </>))
            }
            {props.formFooter &&
                <>{props.formFooter}</>
            }
            <Button type='submit' className={formStyle.button}><div>{props.buttonText}</div></Button>

        </form>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    inputFields: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    initialValues: PropTypes.shape({ fieldsNames: PropTypes.string }),
    validationSchema: PropTypes.object.isRequired
}