import React, { useState, useEffect } from 'react';
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


    const handlePageClick = (page) => {
        if (props.url !== undefined) {
            setLoading(true);

            getRequest(props.url)
                .then(responseData => {
                    setLoading(false);
                    setData(responseData[props.keyInResponse]);
                    setPages(responseData.pages);
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
                <div className="pols-table mt-3">
                    <Row className="pols-table-head">
                        {props.fields.map((field, idx) => (
                            <Col key={idx}><Text left={field.left} bold label={field.label} /></Col>
                        ))}
                    </Row>
                    {data.map((item, idx) => (
                        <Row className="pols-table-row" key={idx}>
                            {props.fields.map((field, idx) => {

                                    let fieldText = '';

                                    switch(field.type) {
                                        case 'number':
                                            fieldText = formatNumber(item[field.name]);
                                            break;
                                        case 'status':
                                            fieldText = field.statuses.find(s => s.value === item[field.name]).name;
                                            break;
                                        case 'button':
                                            fieldText = <Button onClick={
                                                (field.openDetailsLink && item.id !== undefined ?
                                                    () => history.push(field.openDetailsLink + item.id) :
                                                    () => field.buttonOnClick(item.id))
                                            }>
                                                <Text label={field.buttonLabel}/>
                                            </Button>;
                                            break;
                                        case 'text':
                                        default:
                                            fieldText = item[field.name];
                                            break;
                                    }

                                    return (
                                        <Col>
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
                                                {(!field.icon || !field.icon.afterText) &&
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
            }

            <Paginator className="mt-4" start={1} end={pages} selected={page} onChange={handlePageClick} />
        </>
    );


};