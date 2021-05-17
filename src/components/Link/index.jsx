import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RRDLink } from 'react-router-dom';


export const Link = props => {

    let children = props.children;

    if (props.label) {
        children = <FormattedMessage id={ props.label } defaultMessage={ props.label } />;
    }

    const parseExternalLink = link => {
        if (link && !link.includes('http') && !link.includes('https')) {
            link = 'http://' + link;
        }

        return link;
    };

    if (props.external) {
        return <a onClick={() => {window.open(parseExternalLink(props.to))}} className={'tribe-link ' + (props.nav ? 'tribe-link-nav ' : '') +
            (props.className ? props.className : '')}>
            {children}
        </a>;
    }

    if (props.onClick !== undefined) {
        return <span onClick={props.onClick} className={'tribe-link ' + (props.className ? props.className : '')}>
            {children}
        </span>;
    }

    return <RRDLink to={props.to} className={'tribe-link ' + (props.nav ? 'tribe-link-nav ' : '') +
            (props.active ? 'tribe-link-nav-active ' : '') + (props.className ? props.className : '')}>
        {children}
    </RRDLink>;

};