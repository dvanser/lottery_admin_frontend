import React, { useState } from 'react';
import InputStyles from './InputStyle.module.scss';
import { Text } from '../Text';


export const Input = ({className,placeholder,label,onChange,successful,value,type,name, ...classes}) => {

    const inputClass = Object.entries(classes).map(([key]) =>
    InputStyles[key] !== undefined ? InputStyles[key] : '').join(' ') + ' ' + (className ? className : '');

    const [text,setText] = useState(value);
    const [divDisplay,setDivDisplay] = useState(false)

    const handleChange = (event) => {
        setText(event.target.value)
        if(onChange !== undefined) {
            onChange(event.target.value)
        }
    };

    const changeStyleState = (event) => {
        if(event.target.value === '') {
            setDivDisplay(!divDisplay)
        }
    }

    return (
        <div >
            <label className={`${InputStyles['label']} ${successful && InputStyles['successful']}`}>
                <Text label={label} /></label>
            <input className={ `${InputStyles['input']}` }
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                onFocus={changeStyleState} 
                onBlur={changeStyleState}
                type={type}
                name={name}
                />
        </div>
    );
}