import React from 'react';
import bigToy from '../../assets/bigToy.svg';
import backArrow from '../../assets/back.svg';
import forwardArrow from '../../assets/forward.svg';


export const Icon = props => {

    let iconSvg;

    switch(props.type) {
        case 'big-toy':
            iconSvg = bigToy;
            break;
        case 'back-arrow':
            iconSvg = backArrow;
            break;
        case 'forward-arrow':
            iconSvg = forwardArrow;
            break;
        default:
            iconSvg = 'span';
    }

    return <img src={iconSvg} onClick={(props.onClick ? props.onClick : () => {})} className={'' + (props.className ? props.className : '')} />;
};