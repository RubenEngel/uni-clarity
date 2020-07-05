import React from "react"

function EndBalance(props) {
    return (
    
    <div className="row">

            <p className="input-description col-lg-6">End Balance</p>

            <div className="col-lg-6">
                <p className="end-value" ><span className="end-value-currency">£ </span>{props.endBalance}</p>
            </div>
        
        </div>

    )
}

export default EndBalance

