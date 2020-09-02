import React from "react"
import {Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"

const Footer = () => {

    const today = new Date();

    return(
        <div className="footer">
            <Row>
                <Col>
                    <Link to="/about">About</Link> 
                </Col>
                <Col>
                    <Link to="/contact" >Contact</Link>
                </Col>
                <Col>
                    <Link to="/terms-of-service" >Terms</Link>
                </Col>
                <Col>
                    <Link to="/privacy-policy" >Privacy</Link>
                </Col>
            </Row>
            <div className="socials">
                    <a href="https://www.facebook.com/UniClarity-100295725133912" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-square socials-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/uniclarity/" target="_blank" rel="noopener noreferrer"> 
                        <i className="fab fa-instagram socials-icon"></i>
                    </a>  
            </div>
            <div className="copyright">
                <p>Copyright © {today.getFullYear()} UniClarity.app</p>
            </div>
        </div>
    )
}
export default Footer