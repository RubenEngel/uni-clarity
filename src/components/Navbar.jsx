import React, {useState} from 'react';
import Logo from '../icon-512.png';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {Link} from "react-router-dom"

const NavBar = () => {

    const [expanded, setExpanded] = useState(false)

    function handleClick(e, section) {
        function navigate(e, section) {
            e && e.preventDefault(); // to avoid the link from redirecting
            document.getElementById(section).scrollIntoView();
        }
        navigate(e, section)
        setExpanded(false)
    }
    

    return (
        <Navbar 
        id="navbar" 
        expanded={expanded}
        expand="lg" 
        variant="dark" 
        bg="dark" 
        fixed="top"
        >
            <button>
                <Navbar.Brand 
                onClick={(e) => handleClick(e, "intro-section")}
                >
                    <h1 className="navbar-title">
                        Uni<span className="blue">Clarity</span>
                        <img className="title-icon" src={Logo} alt="logo"></img>
                    </h1>
                </Navbar.Brand>
            </button>
            <Navbar.Toggle onClick={() => setExpanded(!expanded)}  aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
            id="responsive-navbar-nav"
            >
                <Nav className="ml-auto">
                    <button className="nav-heading" onClick={(e) => handleClick(e, "account-section")}>Account</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "date-section")}>Dates</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "income-section")}>Income</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "rent-section")}>Rent</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "food-section")}>Food</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "expenses-section")}>Expenses</button>
                    <button className="nav-heading" onClick={(e) => handleClick(e, "results-section")}>Results</button>
                    <NavDropdown bg="dark" className="nav-heading" title="Info">
                        <button className="nav-heading"><Link to="/about">About</Link></button>
                        <button className="nav-heading"><Link to="/contact">Contact</Link></button>
                        <button className="nav-heading"><Link to="/privacy-policy">Privacy</Link></button>
                        <button className="nav-heading"><Link to="/terms-of-service">Terms</Link></button>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
    )
}

export default NavBar