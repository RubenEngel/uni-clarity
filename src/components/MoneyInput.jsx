import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"

const MoneyInput = (props) => {
      
    const {submitValue, updateEndBalance} = useContext(SubmitContext)

    const [inputValue, setInputValue] = useState(props.userValue)

    function handleChange(event) {
        const newInputValue = event.target.value

        setInputValue(newInputValue)
        submitValue(event)
    }

    useEffect(() => {
        updateEndBalance()
    })


        return (
            <div className="input-group mb-3 input-box form">
                <div className="input-group-prepend">
                    <span className="input-group-text">£</span>
                </div>
                <input
                    name={props.id}
                    type="number"
                    min="0"
                    value={inputValue}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Amount (to the nearest pound)"/>
            </div>
        )
    }

    export default MoneyInput