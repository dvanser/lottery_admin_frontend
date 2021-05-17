import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
} from 'reactstrap';
import { Link } from '../';
import { authActions } from '../../_actions';
import { connect } from 'react-redux';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar fixed="top" expand="md">
            <Link className="navbar-brand" to="/">
                <div className="position-absolute" />
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

function mapDispatchToProps(dispatch) {

    return({
        logout: () => {
            dispatch(authActions.logout())
        }
    });
}


const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export { connectedNavBar as NavBar };