import React, {useState, useEffect} from "react"

function NumberInput(props) {
    
    useEffect(props.updateEndBalance)

    const [inputValue, setInputValue] = useState()

    function handleChange(event) {
        const newInputValue = event.target.value

        setInputValue(newInputValue)
        props.submitValue(event)
    }
    
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