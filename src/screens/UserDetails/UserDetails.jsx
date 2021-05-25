import React from 'react';
import { Text, Button } from '../../components/';
import { Col, Row } from 'reactstrap';
import { history } from '../../_library';
import { Table } from "../../components/Table";


export const UserDetails = props => {

    if (props.match === undefined || props.match.params === undefined || props.match.params.userId === undefined) {
        history.push('/404');
        return;
    }

    const url = `/users/${props.match.params.userId}/cheques`;

    return (
        <div className="pl-2 pr-2">
            <Row>
                <Col>
                    <Text left caps h1 label="pols.users.cheques" className="mt-3 ml-2" />
                </Col>
                <Col>
                    <Button className="mt-3 ml-5" onClick={() => history.push('/users')}>
                        <Text label="pols.users.title"/>
                    </Button>
                </Col>
            </Row>
            <Table
                url={url}
                keyInResponse="cheques"
                labelNotFound="pols.common.not_found"
                fields={[
                    {label: 'pols.user.check_link', name: 'link', type: 'text'},
                    {label: 'pols.user.check_number', name: 'number', type: 'text'}
                ]}
            />
        </div>
    );
};
