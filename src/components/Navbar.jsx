import React from 'react';
import Logo from '../graduation-hat.png';
import {Navbar, Nav} from "react-bootstrap"

const NavBar = () => {

    return (
        <Navbar id="navbar" collapseOnSelect expand="md" variant="dark" bg="dark" fixed="top">
            <Navbar.Brand href="#intro-section">
                <h1 className="navbar-title">
                    Uni<span className="clarity">Clarity</span>
                    <img className="title-icon" src={Logo} alt="logo"></img>
                </h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="nav-heading" href="#account-section">Account</Nav.Link>
                     <Nav.Link className="nav-heading" href="#date-section">Dates</Nav.Link>
                     <Nav.Link className="nav-heading" href="#income-section">Income</Nav.Link>
                     <Nav.Link className="nav-heading" href="#rent-section">Rent</Nav.Link>
                     <Nav.Link className="nav-heading" href="#groceries-section">Groceries</Nav.Link>
                     <Nav.Link className="nav-heading" href="#expenses-section">Expenses</Nav.Link>
                     <Nav.Link className="nav-heading" href="#results-section">Results</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
    )
}

export default NavBar