import React, {useContext} from "react"
import SubmitContext from "../context/submit-context"
import {Row, Col} from "react-bootstrap"

const EndBalance = () => {

    const { end_balance } = useContext(SubmitContext)

    return (
    
    <Row>
        <Col lg={6}>
                <p className="input-description">End Balance</p>
        </Col>
        
        <Col lg={6}>
                {isNaN(end_balance) ? <p className="warning">Complete Rent Section</p> :
                <p className="end-value" ><span className="end-value-currency">£ </span>{end_balance}</p>}
        </Col>
    </Row>

    )
}

export default EndBalance

