import React from 'react';
import blockStyles from './BlockStyle.module.scss';


export const Block = ({children, className, onClick, ...classes}) => {

    const blockClass = Object.entries(classes).map(([key, value]) =>
        blockStyles[key] !== undefined ? blockStyles[key] : '').join(' ') + ' ' + (className ? className : '')
        + ' ' + blockStyles.block;

    return(
        <div className={blockClass} onClick={onClick}>
            {children}
        </div>
    );
}