import React  from 'react';
import { Button, Text } from '../../components/';
import { Table } from '../../components/Table';
import { history } from '../../_library';
import { Col, Row } from 'reactstrap';


export const Users = props => {

    return (
        <div className="pl-2 pr-2">
            <Row>
                <Col>
                    <Text left caps h1 label="pols.users.title" className="mt-3 ml-2" />
                </Col>
                <Col>
                    <Button className="mt-3 ml-5" onClick={() => history.push('/prize/requests')}>
                        <Text label="pols.prize_requests.title"/>
                    </Button>
                </Col>
            </Row>
            <Table
                url="/users"
                keyInResponse="users"
                labelNotFound="pols.common.not_found"
                fields={[
                    {label: 'pols.user.id', name: 'id', bold: true, primary: true, type: 'number'},
                    {label: 'pols.user.email', name: 'email', type: 'text'},
                    {label: 'pols.user.name', name: 'name', type: 'text'},
                    {label: 'pols.user.surname', name: 'surname', type: 'text'},
                    {label: 'pols.user.phone', name: 'phone', type: 'text'},
                    {label: 'pols.user.sticks_count', name: 'sticks_count', bold: true, primary: true, type: 'number'},
                    {type: 'button', openDetailsLink: '/users/details/', buttonLabel: 'pols.btn.receipts'}
                ]}
            />
        </div>
    );
};
