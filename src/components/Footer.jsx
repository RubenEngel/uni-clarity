import React from "react"
import {Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"

// target="_blank" rel="noopener noreferrer"

const Footer = () => {

    const today = new Date();

    return(
        <div className="footer">
            <Row>
                <Col>
                    {/* <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> */}
                    <Link to="/terms-of-service" >Terms of Service</Link>
                </Col>
                <Col>
                    {/* <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> */}
                    <Link to="/privacy-policy" >Privacy Policy</Link>
                </Col>  
                <Col>
                    <a href="https://www.facebook.com/UniClarity-100295725133912" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-square socials-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/uniclarity/" target="_blank" rel="noopener noreferrer"> 
                        <i className="fab fa-instagram socials-icon"></i>
                    </a>    
                </Col>
                <Col>
                    {/* <a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a> */}
                    <Link to="/contact" >Contact</Link>
                </Col>
            </Row>
            <div className="copyright">
                <p>Copyright © {today.getFullYear()} UniClarity.app</p>
            </div>
        </div>
    )
}
export default Footer