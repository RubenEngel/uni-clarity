import React, {useState} from "react"
import NavBarAlternate from "./components/NavBarAlternate"
import Footer from "./components/Footer"
import {Row, Col, Form, Button, Card} from "react-bootstrap"
import {db} from "./firebaseConfig"
import Axios from "axios"

const Contact = () => {

    const [formData,
        setFormData] = useState({name: '', email: '', subject: '', message: ''})

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (formData.name === "" || formData.name === "" || formData.name === "" || formData.name === "") {
            return alert("Complete all fields")
        } else {
            sendEmail()
            setConfirmation("Sending...")
        }
    }

    const sendEmail = () => {
        Axios
            .post('https://us-central1-uniclarity-880cf.cloudfunctions.net/submit', formData)
            .then(res => {
                db.collection('emails').add({name: formData.name, email: formData.email, subject: formData.subject, message: formData.message, time: new Date()})
                setConfirmation("Email sent. We will get back to you as soon as possible.")
                setFormData({name: '', email: '', subject: '', message: ''})
            })
            .catch(error => {
                console.log(error)
            })
    }

    const [confirmation, setConfirmation] = useState()

    return (
        <div>
            <NavBarAlternate/>

            <section id="contact-section">
                <div className="subpage-content">
                    <h1 className="subpage-title">Contact</h1>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>
                                                <h3>Name</h3>
                                            </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Control
                                                name="name"
                                                value={formData.name || ""}
                                                type="text"
                                                placeholder="Enter name"
                                                onChange={handleChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>
                                                <h3>Email</h3>
                                            </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Control
                                                name="email"
                                                value={formData.email || ""}
                                                type="email"
                                                placeholder="Enter email"
                                                onChange={handleChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>
                                                <h3>Subject</h3>
                                            </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Control
                                                name="subject"
                                                value={formData.subject || ""}
                                                type="text"
                                                placeholder="Enter subject"
                                                onChange={handleChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Form.Label>
                                                <h3>Message</h3>
                                            </Form.Label>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Control
                                                name="message"
                                                value={formData.message || ""}
                                                as="textarea"
                                                rows="7"
                                                placeholder="Enter message"
                                                onChange={handleChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Row>
                                    <Col
                                        md={{
                                        span: 9,
                                        offset: 3
                                    }}>
                                        <Button className="submit" type="submit" variant="secondary">
                                            <h3>Submit</h3>
                                        </Button>
                                    </Col>
                                </Row>

                            </Form>
                        </Card.Body>
                            <h3>{confirmation}</h3>
                    </Card>

                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default Contact