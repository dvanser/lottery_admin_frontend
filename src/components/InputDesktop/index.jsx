import React, { useState } from 'react';
import InputStyles from './InputDesktopStyle.module.scss';


export const InputDesktop = ({className,placeholder,label,onChange,successful,value,type,name, ...classes}) => {

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

    const clearButton = (event) => {
        event.preventDefault();
        setText('');
        setDivDisplay(!divDisplay);
        event.target.blur()
        if(onChange !== undefined) {
            onChange('')
        }
    }

    return (
        <div className={`${InputStyles['container']} ${inputClass} ${successful && InputStyles['successful']} ${divDisplay ? InputStyles['show'] : InputStyles['hide']}`} >
            <label className={`${InputStyles['label']} ${successful && InputStyles['successful']}`}  >{ label } </label>
            <input className={ `${InputStyles['input']}` }
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                onFocus={changeStyleState} 
                onBlur={changeStyleState}
                type={type}
                name={name}
                />
            <button onClick={clearButton} className={`${InputStyles['clearButton']} ${successful && InputStyles['successful']}`} />
        </div>
    );
}