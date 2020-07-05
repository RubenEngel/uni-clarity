import React, {useState, useEffect} from "react"

function MoneyInput(props) {
      
    useEffect(props.updateEndBalance)

    const [inputValue, setInputValue] = useState()

    function handleChange(event) {
        const newInputValue = event.target.value

        setInputValue(newInputValue)
        props.submitValue(event)
    }


        return (
            <div className="input-group mb-3 input-box form">
                <div className="input-group-prepend">
                    <span className="input-group-text">£</span>
                </div>
                <input
                    name={props.id}
                    type="number"
                    min="0"
                    // defaultValue={props.defaultValue}
                    value={inputValue}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Amount (to the nearest pound)"/>
            </div>
        )
    }

    export default MoneyInput