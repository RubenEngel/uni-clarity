import React from "react"
import NavBarAlternate from "./components/NavBarAlternate"
import Footer from "./components/Footer"
import {Row, Col, Form, Button} from "react-bootstrap"

const Contact = () => {
    return (
        <div>
            <NavBarAlternate/> 

            <section id="contact-section">
                <div className="subpage-content">
                    <h1 className="subpage-title">Contact</h1>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col md={3}><Form.Label><h3>Name</h3></Form.Label></Col>
                                <Col md={9}><Form.Control type="text" placeholder="Enter name" /></Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col md={3}><Form.Label><h3>Email Address</h3></Form.Label></Col>
                                <Col md={9}><Form.Control type="email" placeholder="Enter email" /></Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col md={3}><Form.Label><h3>Subject</h3></Form.Label></Col>
                                <Col md={9}><Form.Control type="text" placeholder="Enter subject" /></Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col md={3}><Form.Label><h3>Message</h3></Form.Label></Col>
                                <Col md={9}><Form.Control as="textarea" rows="7" placeholder="Enter message" /></Col>
                            </Row>
                        </Form.Group>
                        <Button className="submit" variant="secondary"><h3>Submit</h3></Button>
                    </Form>

                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default Contact