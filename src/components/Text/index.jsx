import React from 'react';
import textModuleStyle from './Text.module.scss';

export const Text = ({children, className,type, ...classes}) => {

    const textClass = Object.entries(classes).map(([key]) =>
    textModuleStyle[key] !== undefined ? textModuleStyle[key] : '').join(' ') + ' ' + (className ? className : '');

    const ComponentType = (['justify','right','left'].some(substring => textClass.includes(substring))) ? 'div' : 'span';

    return (
        <ComponentType className = {textClass}>
            {children}
        </ComponentType>
    );
}
