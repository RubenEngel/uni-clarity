import React, { useContext} from "react"
import SubmitContext from "../context/submit-context"

const EndBalance = (props) => {

    const { end_balance } = useContext(SubmitContext)

    return (
    
    <div className="row">
            <p className="input-description col-lg-6">End Balance</p>

            <div className="col-lg-6">
                <p className="end-value" ><span className="end-value-currency">£ </span>{end_balance}</p>
            </div>
    </div>

    )
}

export default EndBalance

