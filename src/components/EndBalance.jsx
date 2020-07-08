import React, {useContext} from "react"
import SubmitContext from "../context/submit-context"
import {Alert} from "react-bootstrap"

const EndBalance = (props) => {

    const { end_balance } = useContext(SubmitContext)

    return (
    
    <div className="row">
            <p className="input-description col-lg-6">End Balance</p>

            <div className="col-lg-6">
                { end_balance ? 
                <p className="end-value" ><span className="end-value-currency">£ </span>{end_balance}</p> :
                <Alert variant="warning" >Rent Section Incomplete</Alert>
                // <p className="end-value" style={{color: "goldenrod"}}>Specify your rent payment method</p>
                }
                
                
            </div>
    </div>

    )
}

export default EndBalance

