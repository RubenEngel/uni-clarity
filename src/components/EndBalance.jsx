import React, {useContext} from "react"
import SubmitContext from "../context/submit-context"
import {Row, Col} from "react-bootstrap"

const EndBalance = () => {

    const { endBalance } = useContext(SubmitContext)

    return (
    
    <Row>
        <Col lg={6}>
                <p className="input-description">End Balance</p>
        </Col>
        
        <Col lg={6}>
                {isNaN(endBalance) ? <p className="warning blue">Complete Rent Section</p> :
                <p className="end-value" ><span className="end-value-currency">£ </span>{endBalance}</p>}
        </Col>
    </Row>

    )
}

export default EndBalance

