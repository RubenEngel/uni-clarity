import React, {useState} from 'react';
import Logo from '../graduation-hat.png';
import {Navbar, Nav} from "react-bootstrap"

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
            onClick={() => setExpanded(false)}
            id="responsive-navbar-nav"
            >
                <Nav className="ml-auto">
                    <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "account-section")}>Account</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "date-section")}>Dates</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "income-section")}>Income</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "rent-section")}>Rent</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "groceries-section")}>Groceries</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "expenses-section")}>Expenses</button>
                     <button className="nav-heading nav-alt" onClick={(e) => handleClick(e, "results-section")}>Results</button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
    )
}

export default NavBar