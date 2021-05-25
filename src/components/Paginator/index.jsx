import React, { useState, useEffect } from 'react';
import './index.scss';
import { Text, Icon } from '../../components';


export const Paginator = props => {

    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const pages = [];

    useEffect(() => {
        if (props.end - props.start > 4) {

            let startPage;

            if (props.selected < 4) {
                startPage = 1;
            } else if (props.selected - props.start > 2) {
                startPage = props.selected - 2;
            } else {
                startPage = props.selected - props.start;
            }

            if (startPage + 4 <= props.end) {
                setStart(startPage);
                setEnd(startPage + 4);
            } else {
                setStart(props.end - 4);
                setEnd(props.end);
            }
        } else {
            setStart(props.start);
            setEnd(props.end);
        }
    }, [props.start, props.end, props.selected]);

    if (props.end < 2) {
        return <></>;
    }

    for (let i = start; i <= end; i++) {
        if (i === props.selected) {
            pages.push(<div className="pols-paginator-page-selected d-inline-block text-center">{i}</div>);
        } else {
            pages.push(<div className="pols-paginator-page d-inline-block"><Text light dark center onClick={() => {props.onChange(i)}}>{i}</Text></div>);
        }
    }

    return (
        <div className={props.className ? props.className : ''}>
            {pages.length > 0 && props.selected !== props.start &&
                <>
                    <div className="pols-paginator-page d-inline-block" onClick={() => {
                        if (props.selected > props.start) props.onChange(props.selected - 1)
                    }}>
                        <Icon className="pols-paginator-btn-icon" type="back-arrow" />
                    </div>
                </>
            }
            {pages}
            {pages.length > 0 && props.selected !== props.end &&
                <>
                    <div className="pols-paginator-page d-inline-block" onClick={() => {
                        if (props.selected < props.end) props.onChange(props.selected + 1)
                    }}>
                        <Icon className="pols-paginator-btn-icon pols-paginator-btn-icon-forward" type="forward-arrow" />
                    </div>
                </>
            }
        </div>
    );
};
