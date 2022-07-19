import React  from 'react';
import {Button, Text} from '../../components/';
import { Table } from '../../components/Table';
import { getFileRequest, putRequest } from '../../_library/request';
import { Col, Row } from 'reactstrap';
import { history } from '../../_library';


export const PrizeRequests = props => {
    const downloadLabel = (id) => {
        getFileRequest(`/label/${id}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${id}PDPLabel.pdf`);

                document.body.appendChild(link);

                link.click();
                link.parentNode.removeChild(link);
            }).catch(error => {console.log(error)}
        );
    };

    const updateStatus = (id) => {
        putRequest(`/prizes/requests/${id}`)
            .then()
            .catch(error => {console.log(error)}
        );
    };

    return (
        <div className="pl-2 pr-2">
            <Row>
                <Col>
                    <Text left caps h1 label="pols.prize_requests.title" className="mt-3 ml-2" />
                </Col>
                <Col>
                    <Button className="mt-3 ml-5" onClick={() => history.push('/users')}>
                        <Text label="pols.users.title"/>
                    </Button>
                </Col>
            </Row>

            <Table
                url="/prizes/requests"
                keyInResponse="prizesRequests"
                labelNotFound="pols.common.not_found"
                fields={[
                    {label: 'pols.prize_request.id', name: 'id', bold: true, primary: true, type: 'number'},
                    {label: 'pols.prize_request.details', name: 'prizesData', primary: true, type: 'array'},
                    {label: 'pols.prize_request.user_id', name: 'userId', bold: true, primary: true, type: 'number'},
                    {label: 'pols.prize_request.status', type: 'buttonStatus', name: 'status', buttonOnClick: (id) => updateStatus(id),  buttonLabel: 'pols.btn.download_label'},
                    {label: 'pols.prize_request.pl_numbers', name: 'plNumbers', type: 'text'},
                    {type: 'button', buttonOnClick: (id) => downloadLabel(id),  buttonLabel: 'pols.btn.download_label'}
                ]}
            />
        </div>
    );
};
