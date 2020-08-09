import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"

const MoneyInput = (props) => {
      
    const {submitValue, updateEndBalance} = useContext(SubmitContext)

    const [inputValue, setInputValue] = useState("")

    function handleChange(event) {
        setInputValue(event.target.value)
        submitValue(event)
    }

    useEffect(() => {
        updateEndBalance()
        setInputValue(props.userValue)
    }, [updateEndBalance, props.userValue])


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