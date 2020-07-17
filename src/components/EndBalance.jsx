import React, {useContext} from "react"
import SubmitContext from "../context/submit-context"

const EndBalance = () => {

    const { end_balance } = useContext(SubmitContext)

    return (
    
    <div className="row">
            <p className="input-description col-lg-6">End Balance</p>

            <div className="col-lg-6">
            {isNaN(end_balance) ? <p className="warning">Complete Rent Section</p> :
                    <p className="end-value" ><span className="end-value-currency">£ </span>{end_balance}</p>}

                                
            </div>
    </div>

    )
}

export default EndBalance

