import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"

const NumberInput = (props) => {
    
    const { submitValue, updateEndBalance } = useContext(SubmitContext)

    const [inputValue, setInputValue] = useState("")

    function handleChange(event) {
        const newInputValue = event.target.value

        setInputValue(newInputValue)
        submitValue(event)
    }

    useEffect(() => {
        updateEndBalance()
    })
    
    return (
        <div className="input-group mb-3 input-box">
        <input
            name={props.id}
            type="number"
            min="0"
            className="form-control"
            aria-label="Remaining rent payments"
            value={inputValue}
            onChange={handleChange}/>
        </div>
    )
}

export default NumberInput