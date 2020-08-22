import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"
import {InputGroup} from "react-bootstrap"

const MoneyInput = (props) => {
      
    const {submitValue} = useContext(SubmitContext)

    const [inputValue, setInputValue] = useState("")

    function handleChange(event) {
        setInputValue(event.target.value)
        submitValue(event)
    }

    useEffect(() => {
        setInputValue(props.userValue)
    }, [props.userValue])


        return (
            <InputGroup className="input-box form">
                <InputGroup.Prepend>
                    <InputGroup.Text>£</InputGroup.Text>
                </InputGroup.Prepend>
                <input
                    name={props.id}
                    type="number"
                    min="0"
                    value={inputValue}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Amount (to the nearest pound)"/>
            </InputGroup>
        )
    }

    export default MoneyInput