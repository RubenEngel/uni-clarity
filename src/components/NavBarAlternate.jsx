import React, {useState} from 'react';
import Logo from '../icon-512.png';
import {Navbar, Nav} from "react-bootstrap"
import {Link} from "react-router-dom"

const NavBarAlternate = () => {

    const [expanded, setExpanded] = useState(false)
    

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
                <Link to="/">
                    <Navbar.Brand 
                    >
                        <h1 className="navbar-title">
                            Uni<span className="blue">Clarity</span>
                            <img className="title-icon" src={Logo} alt="logo"></img>
                        </h1>
                    </Navbar.Brand>
                </Link>
                
            </button>
            
            <Navbar.Toggle onClick={() => setExpanded(!expanded)}  aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse 
            onClick={() => setExpanded(false)}
            id="responsive-navbar-nav"
            >
                <Nav className="ml-auto">
                            <Link className="nav-alt nav-heading" to="/about">About</Link>
                            {/* <Link className="nav-alt nav-heading" to="/contact">Contact</Link> */}
                            <Link className="nav-alt nav-heading" to="/privacy-policy">Privacy Policy</Link>
                            <Link className="nav-alt nav-heading" to="/terms-of-service">Terms of Service</Link>
                            <Link className="nav-alt nav-heading" to="/">Back to App</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>   
    )
}

export default NavBarAlternate