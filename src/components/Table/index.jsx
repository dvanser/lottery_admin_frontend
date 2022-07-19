import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import { formatDate, formatNumber } from '../../_library/common';
import { getRequest } from '../../_library/request';
import { Col, Row } from 'reactstrap';
import { Text, Icon, DataLoadingError, Paginator, Button } from '../';
import { history } from '../../_library';


export const Table = props => {

    const [data, setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const loadingRef = useRef(loading);
    const [total, setTotal] = useState(0);


    const handlePageClick = (page) => {
        console.log(page);
        setLoading(true);
        loadingRef.current = true;

        if (props.url !== undefined) {
            setLoading(true);

            getRequest(`${props.url}?&page=${page}`)
                .then(responseData => {
                    setLoading(false);
                    setData(responseData[props.keyInResponse]);
                    setPages(responseData.pages);
                    if (responseData.total !== undefined) {
                        setTotal(responseData.total);
                    } else {
                        setTotal(-1);
                    }

                    setPage(page);
                    setLoadingError(false);
                })
                .catch(err => {
                    setLoading(false);
                    setLoadingError(err);
                });
        } else {
            setData(props.data);
            console.log(data);
        }
    };

    useEffect(() => {
        if (props.updateData && props.updateData === true) {
            handlePageClick(page);
            props.updateDataStatus();
        }
    }, [props.updateData]);

    useEffect(() => {
        handlePageClick(page);
    }, []);

    return (
        <>
            {loadingError &&
                <DataLoadingError handleSubmit={() => handlePageClick(page)} />
            }
            {loading &&
                <Text label="pols.loading" />
            }
            {data.length === 0 && !loadingError && !loading &&
                <Text label={props.labelNotFound} />
            }
            {data.length > 0 &&
                <>
                    {total !== -1 &&
                        <Text bold left>Total: {total}</Text>
                    }
                    <div className="pols-table mt-3">
                        <Row className="pols-table-head">
                            {props.fields.map((field, idx) => (
                                <Col key={idx}><Text left={field.left} bold label={field.label} /></Col>
                            ))}
                        </Row>
                        {data.map((item, idx) => (
                            <Row className="pols-table-row" key={idx}>
                                {props.fields.map((field, colIdx) => {

                                        let fieldText = '';

                                        switch(field.type) {
                                            case 'number':
                                                fieldText = formatNumber(item[field.name]);
                                                break;
                                            case 'status':
                                                fieldText = field.statuses.find(s => s.value === item[field.name]).name;
                                                break;
                                            case 'array':
                                                fieldText = '';
                                                item['prizesData'].forEach(element => {
                                                    fieldText = fieldText + 'type: ' + element.type + '; count: ' + element.count + '<br />'
                                                });
                                                break;
                                            case 'button':
                                                if (item.plNumbers === '') {
                                                    fieldText = <Button>
                                                        <Text label={'Pick up'}/>
                                                    </Button>;
                                                } else {
                                                    fieldText = <Button onClick={
                                                        (field.openDetailsLink && item.id !== undefined ?
                                                            () => history.push(field.openDetailsLink + item.id) :
                                                            () => field.buttonOnClick(item.id))
                                                    }>
                                                        <Text label={field.buttonLabel}/>
                                                    </Button>;
                                                }
                                                break;
                                            case 'buttonStatus':
                                                fieldText = <Button onClick={
                                                    (field.openDetailsLink && item.id !== undefined ?
                                                        () => history.push(field.openDetailsLink + item.id) :
                                                        () => field.buttonOnClick(item.id))
                                                }>
                                                    <Text label={item.status}/>
                                                </Button>;
                                                break;
                                            case 'text':
                                            default:
                                                fieldText = item[field.name];
                                                break;
                                        }

                                        return (
                                            <Col key={idx + '_' + colIdx}>
                                                <Text left={field.left} bold={field.bold} primary={field.primary}
                                                      error={field.colorCondition !== undefined && item[field.colorCondition.conditionFieldName]}
                                                      success={field.colorCondition !== undefined && !item[field.colorCondition.conditionFieldName]} >
                                                    {field.icon !== undefined && field.icon.afterText &&
                                                    <>{fieldText}</>
                                                    }
                                                    {field.icon !== undefined &&
                                                    <Icon className={field.icon.className}
                                                          type={(field.icon.conditionFieldName ?
                                                              (item[field.icon.conditionFieldName] === field.icon.conditionFieldValue ?
                                                                  field.icon.typeConditionTrue :
                                                                  field.icon.typeConditionFalse) :
                                                              field.icon.type)} />
                                                    }
                                                    {field.type === 'array' &&
                                                        <><div dangerouslySetInnerHTML={{__html: fieldText}} /></>
                                                    }
                                                    {(!field.icon || !field.icon.afterText) && field.type !== 'array' &&
                                                    <>{fieldText}</>
                                                    }
                                                </Text>
                                            </Col>
                                        );
                                    }
                                )}
                            </Row>
                        ))}
                    </div>
                </>
            }

            <Paginator className="mt-4 mb-4 text-center" start={1} end={pages} selected={page} onChange={handlePageClick} />
        </>
    );
}
