import React, {useState, useContext} from "react"
import SubmitContext from "../context/submit-context"
import { Form, Row, Col } from "react-bootstrap"

    const DateRangeInput = (props) => {

        const {submitValue, 
        } = useContext(SubmitContext)

    // ------------------------------------------- Start date state
            const [startDate, setStartDate] = useState(props.startDate)

            function handleStartChange(event) {
                setStartDate(event.target.value)
                submitValue(event)
            }

    // ------------------------------------------- End date state
            const [endDate, setEndDate] = useState(props.endDate)

            function handleEndChange(event) {
                setEndDate(event.target.value)
                submitValue(event)
            }


        return (
                <Form.Group>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="start-date-input" className="col-form-label input-description">{props.date1_name}</label>
                            <input
                            name={props.date1_id}
                            className="form-control"
                            type="date"
                            value={startDate}
                            onChange={handleStartChange}
                            id={props.date1_id}
                            />

                        </Col>
                        <Col md={6}>      
                            <label htmlFor="end-date-input" className="col-form-label input-description">{props.date2_name}</label>
                            <input
                                name={props.date2_id}
                                className="form-control"
                                type="date"
                                placeholder="dd-mm-yyyy"
                                value={endDate}
                                onChange={handleEndChange}
                                id={props.date2_id}
                                />
                        </Col>
                    </Row>
                </Form.Group>   

        )
}

export default DateRangeInput