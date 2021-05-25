import React from 'react';
import textModuleStyle from './Text.module.scss';
import { FormattedMessage } from 'react-intl';

export const Text = ({children, className, type, label, ...classes}) => {

    const textClass = Object.entries(classes).map(([key]) =>
    textModuleStyle[key] !== undefined ? textModuleStyle[key] : '').join(' ') + ' ' + (className ? className : '');

    const ComponentType = (['justify','right','left'].some(substring => textClass.includes(substring))) ? 'div' : 'span';

    if (label) {
        return <FormattedMessage id={ label } >
            {msg => (
                <ComponentType className={textClass}>{msg}</ComponentType>
            )}
        </FormattedMessage>;
    }

    return (
        <ComponentType className = {textClass}>
            {children}
        </ComponentType>
    );
};
