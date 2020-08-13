import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"
import { InputGroup } from "react-bootstrap"

const NumberInput = (props) => {
    
    const { submitValue, updateEndBalance } = useContext(SubmitContext)

    const [inputValue, setInputValue] = useState(props.userValue)

    function handleChange(event) {
        setInputValue(event.target.value)
        submitValue(event)
    }

    useEffect(() => {
        updateEndBalance()
    })
    
    return (
        <InputGroup className="input-box">
            <input
            name={props.id}
            type="number"
            min="0"
            className="form-control number-input"
            aria-label="Remaining rent payments"
            value={inputValue}
            onChange={handleChange}/>
        </InputGroup>
    )
}

export default NumberInput