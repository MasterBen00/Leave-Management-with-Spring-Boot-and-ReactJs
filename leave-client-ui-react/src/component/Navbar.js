import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBAnimation
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import {Link} from "react-router-dom";

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (


                <MDBNavbar color="mdb-color lighten-1" dark expand="md">
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <MDBAnimation type="fadeInLeft" duration="2s">
                                <strong className="white-text">ERP</strong>
                            </MDBAnimation>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBAnimation type="fadeInLeft" duration="1s">
                                        <MDBNavLink to="/view" replace>Leave</MDBNavLink>
                                    </MDBAnimation>



                                </MDBNavItem>


                            </MDBNavbarNav>

                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>


        );
    }
}

export default NavbarPage;
