import React  from 'react';
import {Button, Text} from '../../components/';
import { Table } from '../../components/Table';
import { getRequest } from '../../_library/request';
import { Col, Row } from 'reactstrap';
import { history } from '../../_library';


export const PrizeRequests = props => {

    const downloadLabel = (id) => {
        getRequest(`/label/${id}`)
            .then(response => {
                response.
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'employees.pdf';
                    a.click();
                });
            }).catch(response => {
            if (response.error) {
            }
        });
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
                    {label: 'pols.prize_request.user_id', name: 'userId', bold: true, primary: true, type: 'number'},
                    // {label: 'pols.prize_request.status', name: 'status', type: 'text'},
                    {label: 'pols.prize_request.pl_numbers', name: 'plNumbers', type: 'text'},
                    {type: 'button', buttonOnClick: (id) => downloadLabel(id),  buttonLabel: 'pols.btn.download_label'}
                ]}
            />
        </div>
    );
};
